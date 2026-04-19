// 값과 이벤트는 모두 외부에서 props로 저달받음
// 로직이 없는 표시 중심 컴포넌트
function BankingForm({ form, handleChange, handleSubmit, isPending, error }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="sender_name"
        value={form.sender_name}
        onChange={handleChange}
        placeholder="이름"
      />

      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="금액"
      />

      <button type="submit">거래 등록</button>

      {isPending && <div>등록 중</div>}
      {error && <div>{error.message}</div>}
    </form>
  );
}

export default BankingForm;