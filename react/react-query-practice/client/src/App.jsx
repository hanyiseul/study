import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api/usersApi';
import UserList from './components/UserList';
import UserSummary from './components/UserSummary';

function App() {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000
  });

  return (
    <div className="container">
      <h1>React Query 캐싱 실습</h1>
      <p className="description">
        Node 서버에서 데이터를 조회하고, React Query의 캐시 및 재검증 구조를 확인한다.
      </p>

      <div className="panel">
        <button className="action-button" onClick={() => refetch()}>
          사용자 목록 다시 불러오기
        </button>

        {isLoading && <p className="status">최초 로딩 중입니다.</p>}
        {!isLoading && isFetching && (
          <p className="status">최신 데이터를 확인하는 중입니다.</p>
        )}
        {error && <p className="status error">{error.message}</p>}
      </div>

      {data && (
        <>
          <UserSummary />
          <UserList users={data} />
        </>
      )}
    </div>
  );
}

export default App;