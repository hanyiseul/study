function ProductTable({ products }) {
  return (
    <div className="panel">
      <h2>상품 목록</h2>

      <table className="product-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>상품명</th>
            <th>분류</th>
            <th>금액</th>
            <th>위험도</th>
            <th>등록 시각</th>
          </tr>
        </thead>
        <tbody>
          {products.map(function (item) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product_name}</td>
                <td>{item.category}</td>
                <td>{Number(item.price).toLocaleString('ko-KR')}원</td>
                <td>{item.risk_level}</td>
                <td>{item.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;