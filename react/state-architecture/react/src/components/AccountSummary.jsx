// 계좌 요약 데이터 출력
// Server State를 화면에 표시하는 역할만 수행
function AccountSummary({ account, isLoading, error }) {
  if (isLoading) return <div>계좌 로딩 중</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h3>계좌 요약</h3>
      <p>예금주: {account.owner_name}</p>
      <p>잔액: {account.balance}</p>
    </div>
  );
}

export default AccountSummary;