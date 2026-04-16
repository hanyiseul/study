function TransferList({ transfers }) {
  return (
    <div className="panel">
      <h2>거래 목록</h2>

      <table className="transfer-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>보내는 사람</th>
            <th>받는 사람</th>
            <th>금액</th>
            <th>이체 유형</th>
            <th>상태</th>
            <th>등록 시각</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map(function (item) {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.sender_name}</td>
                <td>{item.receiver_name}</td>
                <td>{Number(item.amount).toLocaleString('ko-KR')}원</td>
                <td>{item.transfer_type}</td>
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

export default TransferList;