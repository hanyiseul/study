import { useState } from 'react';

const DATA = [
  { id: 1, name: '노트북', stock: 12 },
  { id: 2, name: '모니터', stock: 5 },
  { id: 3, name: '키보드', stock: 20 }
];

function App() {
  const [rows, setRows] = useState(DATA);
  const [favoriteIds, setFavoriteIds] = useState([]);

  function handleToggle(id) {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(function (item) {
        return item !== id;
      }));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>재고 조회 및 관심상품 관리</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>상품명</th>
            <th>재고</th>
            <th>관심상품</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(function (row) {
            const isFavorite = favoriteIds.includes(row.id);

            return (
              <tr
                key={row.id}
                style={{
                  background: isFavorite ? '#fff3cd' : 'white'
                }}
              >
                <td>{row.name}</td>

                <td>{row.stock}</td>

                <td>
                  {!isFavorite && (
                    <button onClick={() => handleToggle(row.id)}>
                      관심등록
                    </button>
                  )}

                  {isFavorite && (
                    <button onClick={() => handleToggle(row.id)}>
                      관심해제
                    </button>
                  )}
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