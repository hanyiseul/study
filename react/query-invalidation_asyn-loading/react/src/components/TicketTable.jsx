function TicketTable({ tickets }) {
  return (
    <div className="panel">
      <h2>문의 목록</h2>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>고객명</th>
            <th>제목</th>
            <th>내용</th>
            <th>상태</th>
            <th>등록 시각</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(function (item) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer_name}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.status}</td>
                <td>{item.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;