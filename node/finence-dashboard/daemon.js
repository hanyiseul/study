const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: '1234',
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const stockCode = 'FIN001';
let currentPrice = 100000;
let secondCount = 0;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createSecondData() {
    const priceChange = randomInt(-500, 500);
    currentPrice = currentPrice + priceChange;

    if (currentPrice < 90000) currentPrice = 90000;
    if (currentPrice > 110000) currentPrice = 110000;

    return {
        stock_code: stockCode,
        price: currentPrice,
        volume: randomInt(10, 300),
        trade_strength: (80 + Math.random() * 40).toFixed(2),
        unit_type: 'sec'
    };
}

async function insertData(data) {
    await pool.query(`
        INSERT INTO market_data (stock_code, price, volume, trade_strength, unit_type)
        VALUES (?, ?, ?, ?, ?)
    `, [
        data.stock_code,
        data.price,
        data.volume,
        data.trade_strength,
        data.unit_type
    ]);
}

async function insertFiveSecondSummary() {
    const [rows] = await pool.query(`
        SELECT price, volume, trade_strength
        FROM market_data
        WHERE stock_code = ? AND unit_type = 'sec'
        ORDER BY id DESC
        LIMIT 5
    `, [stockCode]);

    if (rows.length === 0) return;

    let priceSum = 0;
    let volumeSum = 0;
    let strengthSum = 0;

    for (const row of rows) {
        priceSum += row.price;
        volumeSum += row.volume;
        strengthSum += Number(row.trade_strength);
    }

    const avgPrice = Math.round(priceSum / rows.length);
    const avgStrength = (strengthSum / rows.length).toFixed(2);

    await pool.query(`
        INSERT INTO market_data (stock_code, price, volume, trade_strength, unit_type)
        VALUES (?, ?, ?, ?, ?)
    `, [
        stockCode,
        avgPrice,
        volumeSum,
        avgStrength,
        '5sec'
    ]);
}

async function insertMinuteSummary() {
    const [rows] = await pool.query(`
        SELECT price, volume, trade_strength
        FROM market_data
        WHERE stock_code = ? AND unit_type = 'sec'
          AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
        ORDER BY id DESC
    `, [stockCode]);

    if (rows.length === 0) return;

    let priceSum = 0;
    let volumeSum = 0;
    let strengthSum = 0;

    for (const row of rows) {
        priceSum += row.price;
        volumeSum += row.volume;
        strengthSum += Number(row.trade_strength);
    }

    const avgPrice = Math.round(priceSum / rows.length);
    const avgStrength = (strengthSum / rows.length).toFixed(2);

    await pool.query(`
        INSERT INTO market_data (stock_code, price, volume, trade_strength, unit_type)
        VALUES (?, ?, ?, ?, ?)
    `, [
        stockCode,
        avgPrice,
        volumeSum,
        avgStrength,
        'min'
    ]);
}

async function runDaemon() {
    console.log('금융 데이터 데몬 시작');

    setInterval(async () => {
        try {
            secondCount++;

            const secondData = createSecondData();
            await insertData(secondData);

            console.log(`sec insert 완료: 가격=${secondData.price}, 거래량=${secondData.volume}`);

            if (secondCount % 5 === 0) {
                await insertFiveSecondSummary();
                console.log('5초 요약 insert 완료');
            }

            if (secondCount % 60 === 0) {
                await insertMinuteSummary();
                console.log('1분 요약 insert 완료');
            }
        } catch (err) {
            console.error('daemon error:', err);
        }
    }, 1000);
}

runDaemon();