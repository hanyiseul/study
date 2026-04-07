const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'testuser',
    password: '1234',
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    dateStrings: true
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'dashboard.html'));
});

app.get('/api/dashboard/summary', async (req, res) => {
    try {
        const stockCode = req.query.stock_code || 'FIN001';

        const [latestRows] = await pool.query(`
            SELECT id, stock_code, price, volume, trade_strength, unit_type, created_at
            FROM market_data
            WHERE stock_code = ? AND unit_type = 'sec'
            ORDER BY id DESC
            LIMIT 1
        `, [stockCode]);

        const [previousRows] = await pool.query(`
            SELECT id, stock_code, price, volume, trade_strength, unit_type, created_at
            FROM market_data
            WHERE stock_code = ? AND unit_type = 'sec'
            ORDER BY id DESC
            LIMIT 1 OFFSET 1
        `, [stockCode]);

        const latest = latestRows[0] || null;
        const previous = previousRows[0] || null;

        let changePrice = 0;
        let changeRate = 0;

        if (latest && previous) {
            changePrice = latest.price - previous.price;
            if (previous.price !== 0) {
                changeRate = Number(((changePrice / previous.price) * 100).toFixed(2));
            }
        }

        const [minuteStatsRows] = await pool.query(`
            SELECT
                AVG(price) AS avg_price,
                MAX(price) AS max_price,
                MIN(price) AS min_price,
                SUM(volume) AS total_volume
            FROM market_data
            WHERE stock_code = ?
              AND unit_type = 'sec'
              AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)
        `, [stockCode]);

        const minuteStats = minuteStatsRows[0] || {};

        res.json({
            success: true,
            summary: {
                latestPrice: latest ? latest.price : 0,
                latestVolume: latest ? latest.volume : 0,
                tradeStrength: latest ? Number(latest.trade_strength) : 0,
                changePrice,
                changeRate,
                avgPrice1Min: minuteStats.avg_price ? Math.round(minuteStats.avg_price) : 0,
                maxPrice1Min: minuteStats.max_price ? Number(minuteStats.max_price) : 0,
                minPrice1Min: minuteStats.min_price ? Number(minuteStats.min_price) : 0,
                totalVolume1Min: minuteStats.total_volume ? Number(minuteStats.total_volume) : 0,
                updatedAt: latest ? latest.created_at : '-'
            }
        });
    } catch (err) {
        console.error('summary error:', err);
        res.status(500).json({
            success: false,
            message: '요약 데이터 조회 중 오류가 발생했습니다.'
        });
    }
});

app.get('/api/dashboard/unit', async (req, res) => {
    try {
        const stockCode = req.query.stock_code || 'FIN001';
        const unitType = req.query.type || 'sec';

        if (unitType !== 'sec' && unitType !== '5sec' && unitType !== 'min') {
            return res.status(400).json({
                success: false,
                message: 'type 값은 sec, 5sec, min만 가능합니다.'
            });
        }

        let limitCount = 10;
        if (unitType === 'sec') limitCount = 30;
        if (unitType === '5sec') limitCount = 20;
        if (unitType === 'min') limitCount = 20;

        const [rows] = await pool.query(`
            SELECT id, stock_code, price, volume, trade_strength, unit_type, created_at
            FROM market_data
            WHERE stock_code = ? AND unit_type = ?
            ORDER BY id DESC
            LIMIT ?
        `, [stockCode, unitType, limitCount]);

        const orderedRows = rows.reverse();

        res.json({
            success: true,
            rows: orderedRows
        });
    } catch (err) {
        console.error('unit error:', err);
        res.status(500).json({
            success: false,
            message: '단위별 데이터 조회 중 오류가 발생했습니다.'
        });
    }
});

app.get('/api/dashboard/stats', async (req, res) => {
    try {
        const stockCode = req.query.stock_code || 'FIN001';
        const centerId = Number(req.query.center_id);

        if (!centerId) {
            return res.status(400).json({
                success: false,
                message: 'center_id 값이 필요합니다.'
            });
        }

        const [centerRows] = await pool.query(`
            SELECT id, stock_code, price, volume, trade_strength, unit_type, created_at
            FROM market_data
            WHERE id = ? AND stock_code = ? AND unit_type = 'sec'
        `, [centerId, stockCode]);

        const centerRow = centerRows[0];

        if (!centerRow) {
            return res.status(404).json({
                success: false,
                message: '기준 데이터를 찾을 수 없습니다.'
            });
        }

        const [statsRows] = await pool.query(`
            SELECT
                COUNT(*) AS data_count,
                AVG(price) AS avg_price,
                MAX(price) AS max_price,
                MIN(price) AS min_price,
                SUM(volume) AS total_volume,
                AVG(trade_strength) AS avg_trade_strength
            FROM market_data
            WHERE stock_code = ?
              AND unit_type = 'sec'
              AND created_at BETWEEN DATE_SUB(?, INTERVAL 10 SECOND)
                                  AND DATE_ADD(?, INTERVAL 10 SECOND)
        `, [stockCode, centerRow.created_at, centerRow.created_at]);

        const stats = statsRows[0] || {};

        res.json({
            success: true,
            center: centerRow,
            stats: {
                dataCount: stats.data_count ? Number(stats.data_count) : 0,
                avgPrice: stats.avg_price ? Math.round(stats.avg_price) : 0,
                maxPrice: stats.max_price ? Number(stats.max_price) : 0,
                minPrice: stats.min_price ? Number(stats.min_price) : 0,
                totalVolume: stats.total_volume ? Number(stats.total_volume) : 0,
                avgTradeStrength: stats.avg_trade_strength ? Number(stats.avg_trade_strength).toFixed(2) : 0
            }
        });
    } catch (err) {
        console.error('stats error:', err);
        res.status(500).json({
            success: false,
            message: '통계 데이터 조회 중 오류가 발생했습니다.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`실시간 금융 대시보드 실행: http://localhost:${PORT}`);
});