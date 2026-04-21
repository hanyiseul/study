import ThemeToggle from '../components/ThemeToggle';
import BankingForm from '../components/BankingForm';
import AccountSummary from '../components/AccountSummary';
import TransactionList from '../components/TransactionList';
import { useBankingState } from '../hooks/useBankingState';

function BankingPage() { // 전체 화면을 조립하는 역할
  const {
    theme,
    toggleTheme,
    form,
    handleChange,
    handleSubmit,
    accountQuery,
    transactionsQuery,
    createMutation
  } = useBankingState(); // 모든 상태와 이벤트를 가져옴

  return (
    <div>
      <h1>상태 관리 아키텍처 실습</h1>

      {/* Client State 사용 */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> 

      {/* Client State와 Mutation 상태를 사용 */}
      <BankingForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isPending={createMutation.isPending}
        error={createMutation.error}
      />

      {/* Server State */}
      <AccountSummary
        account={accountQuery.data}
        isLoading={accountQuery.isLoading}
        error={accountQuery.error}
      />

      {/* Server State */}
      <TransactionList
        transactions={transactionsQuery.data || []}
        isLoading={transactionsQuery.isLoading}
        isFetching={transactionsQuery.isFetching}
        error={transactionsQuery.error}
      />
    </div>
  );
}

export default BankingPage;