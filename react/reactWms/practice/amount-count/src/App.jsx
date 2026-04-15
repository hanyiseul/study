import { useState } from 'react';

const DATA = [
  { id: 1, name: '노트북', stock: 10 },
  { id: 2, name: '모니터', stock: 5 },
  { id: 3, name: '키보드', stock: 20 }
];

function App() {
  const [rows, setRows] = useState(DATA);

  function handleIncrease(id) {
    const newRows = rows.map(function (row) {
      if (row.id === id) {
        return { ...row, stock: row.stock + 1 };
      }
      return row;
    });

    setRows(newRows);
  }

  function handleDecrease(id) {
    const newRows = rows.map(function (row) {
      if (row.id === id && row.stock > 0) {
        return { ...row, stock: row.stock - 1 };
      }
      return row;
    });

    setRows(newRows);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>재고 수량 조정</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>상품명</th>
            <th>재고 수량</th>
            <th>조작</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(function (row) {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>

                <td>{row.stock}</td>

                <td>
                  <button onClick={() => handleIncrease(row.id)}>+</button>

                  <button onClick={() => handleDecrease(row.id)}>-</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;