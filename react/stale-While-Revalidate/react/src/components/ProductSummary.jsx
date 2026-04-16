function ProductSummary({ products }) {
  const totalCount = products.length;

  const totalPrice = products.reduce(function (sum, item) {
    return sum + Number(item.price);
  }, 0);

  const highRiskCount = products.filter(function (item) {
    return item.risk_level === '높음';
  }).length;

  return (
    <div className="panel">
      <h2>상품 요약</h2>
      <p>전체 상품 수: {totalCount}개</p>
      <p>총 금액: {totalPrice.toLocaleString('ko-KR')}원</p>
      <p>고위험 상품 수: {highRiskCount}개</p>
    </div>
  );
}

export default ProductSummary;