import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser } from './api/usersApi';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './styles/app.css';

function App() {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  function handleAddUser(name) {
    mutation.mutate(name);
  }

  return (
    <div className="container">
      <h1 className="page-title">사용자 관리 실습</h1>
      <p className="page-description">
        Query Invalidation과 Loading, Fetching, Error 상태를 화면에서 구분하여 확인한다.
      </p>

      <div className="panel">
        <UserForm onAdd={handleAddUser} isPending={mutation.isPending} />

        {isLoading && (
          <div className="status-box status-loading">
            초기 데이터를 불러오는 중입니다.
          </div>
        )}

        {!isLoading && isFetching && (
          <div className="status-box status-fetching">
            목록을 최신 상태로 다시 확인하는 중입니다.
          </div>
        )}

        {mutation.isPending && (
          <div className="status-box status-mutation">
            사용자 정보를 서버에 저장하는 중입니다.
          </div>
        )}

        {error && (
          <div className="status-box status-error">
            오류가 발생했습니다: {error.message}
          </div>
        )}
      </div>

      <div className="panel">
        <h2 className="list-title">사용자 목록</h2>
        <UserList users={data || []} />
      </div>
    </div>
  );
}

export default App;