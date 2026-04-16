function TransferSummary({ transfers }) {
  const totalCount = transfers.length;

  const totalAmount = transfers.reduce(function (sum, item) {
    return sum + Number(item.amount);
  }, 0);

  return (
    <div className="panel">
      <h2>거래 요약</h2>
      <p>총 거래 건수: {totalCount}건</p>
      <p>총 거래 금액: {totalAmount.toLocaleString('ko-KR')}원</p>
    </div>
  );
}

export default TransferSummary;