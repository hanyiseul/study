import SearchBox from '../components/SearchBox';
import Timer from '../components/Timer';
import ThemeButton from '../components/ThemeButton';
import TransactionList from '../components/TransactionList';

function Dashboard() {
  return (
    <div>
      <h1>상태 관리 계층 실습</h1>

      {/* Local State 예제 */}
      <SearchBox /> 
      {/* Component Lifecycle */}
      <Timer />
      {/* Global UI State */}
      <ThemeButton />
      {/* Server State */}
      <TransactionList />
    </div>
  );
}

export default Dashboard;