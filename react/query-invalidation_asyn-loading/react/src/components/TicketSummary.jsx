function TicketSummary({ tickets }) {
  const totalCount = tickets.length;

  const waitingCount = tickets.filter(function (item) {
    return item.status === '접수대기';
  }).length;

  const processingCount = tickets.filter(function (item) {
    return item.status === '처리중';
  }).length;

  return (
    <div className="panel">
      <h2>문의 요약</h2>
      <p>전체 문의 수: {totalCount}건</p>
      <p>접수대기: {waitingCount}건</p>
      <p>처리중: {processingCount}건</p>
    </div>
  );
}

export default TicketSummary;