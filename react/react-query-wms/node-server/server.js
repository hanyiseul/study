const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// static 디렉토리 제공
app.use(express.static(path.join(__dirname, 'static')));

// DB 연결
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

function mapInventoryRow(row) {
  return {
    id: row.id,
    productInitial: row.product_initial,
    productName: row.product_name,
    category: row.category,
    status: row.status,
    location: row.location,
    storagePeriod: row.storage_period,
    inboundDate: row.inbound_date,
    outboundDueDate: row.outbound_due_date,
    expectedAmount: Number(row.expected_amount).toLocaleString('ko-KR') + '원'
  };
}

// 재고 목록 조회
app.get('/api/inventory', async function (req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM inventory_items
      ORDER BY id DESC
    `);

    await new Promise(function (resolve) {
      setTimeout(resolve, 1500);
    });

    res.json(rows.map(mapInventoryRow));
  } catch (error) {
    res.status(500).json({ message: '재고 목록 조회 실패' });
  }
});

// 재고 등록
app.post('/api/inventory', async function (req, res) {
  try {
    const {
      productInitial,
      productName,
      category,
      status,
      location,
      storagePeriod,
      inboundDate,
      outboundDueDate,
      expectedAmount
    } = req.body;

    if (
      !productInitial ||
      !productName ||
      !category ||
      !status ||
      !location ||
      !storagePeriod ||
      !inboundDate ||
      !outboundDueDate ||
      !expectedAmount
    ) {
      return res.status(400).json({ message: '모든 항목을 입력해야 합니다.' });
    }

    if (Number(expectedAmount) >= 10000000) {
      return res.status(500).json({ message: '금액이 너무 커서 등록 실패' });
    }

    await pool.query(
      `
      INSERT INTO inventory_items
      (
        product_initial,
        product_name,
        category,
        status,
        location,
        storage_period,
        inbound_date,
        outbound_due_date,
        expected_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        productInitial,
        productName,
        category,
        status,
        location,
        storagePeriod,
        inboundDate,
        outboundDueDate,
        Number(expectedAmount)
      ]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: '재고 등록 실패' });
  }
});

// 메인 카드 조회
app.get('/api/summary-cards', async function (req, res) {
  try {
    const [[summary]] = await pool.query(`
      SELECT
        COUNT(*) AS totalCount,
        SUM(CASE WHEN status = '입고예정' THEN 1 ELSE 0 END) AS inboundPlanned,
        SUM(CASE WHEN status = '입고완료' THEN 1 ELSE 0 END) AS inboundDone,
        SUM(CASE WHEN status = '출고예정' THEN 1 ELSE 0 END) AS outboundPlanned,
        SUM(CASE WHEN status = '출고완료' THEN 1 ELSE 0 END) AS outboundDone,
        SUM(expected_amount) AS totalAmount
      FROM inventory_items
    `);

    res.json({
      main: [
        {
          title: '견적내역',
          value: String(summary.totalCount || 0),
          icon: '□'
        },
        {
          title: '입고내역',
          value: String((summary.inboundPlanned || 0) + (summary.inboundDone || 0)),
          subText: `입고예정 ${summary.inboundPlanned || 0} / 입고완료 ${summary.inboundDone || 0}`,
          icon: '≡'
        },
        {
          title: '출고내역',
          value: String((summary.outboundPlanned || 0) + (summary.outboundDone || 0)),
          subText: `출고예정 ${summary.outboundPlanned || 0} / 출고완료 ${summary.outboundDone || 0}`,
          icon: '◎'
        },
        {
          title: '정산내역',
          value: Number(summary.totalAmount || 0).toLocaleString('ko-KR'),
          icon: '◉'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: '카드 요약 조회 실패' });
  }
});

// React 라우팅 대응
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.get('/*rest', function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(PORT, function () {
  console.log('server running on 3000');
});