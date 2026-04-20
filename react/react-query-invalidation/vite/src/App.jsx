import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser } from './api/usersApi';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './styles/app.css';

function App() {
  const queryClient = useQueryClient(); // 현재 애플리케이션에서 사용중인 QueryClient 객체에 접근하기 위한 훅 -> invalidateQueries()를 호출하려면 이 객체가 필요

  // 사용자 목록 조회 흐름
  // {조회 성공시 사용자 목록 배열, 초기 로딩 상태, 새로운 데이터 로딩, 실패시 에러 객체}
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['users'], // Query의 식별자 -> 같은 키를 사용하는 모든 조회는 같은 캐시를 참조
    queryFn: fetchUsers // 실제 서버 요청 함수 -> 함수가 실행되어 해당 api 결과 받아옴
  });
  
  // 사용자 생성 흐름
  const mutation = useMutation({
    mutationFn: createUser, // 생성 성공 직후 실행되는 후속 처리
    onSuccess: function () {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // 캐시를 무효화하고 다시 조회하게 만듦
      // queryFn: fetchUsers를 다시 호출하지 않고 Query Key 단위로 무효화 하는 방식
    }
  });

  // 입력폼과 Mutation을 연결하는 중간 함수
  function handleAddUser(name) {
    mutation.mutate(name); // userForm에서 전달한 이름을 전달받아 Mutation 실행만 담당
  }

  return (
    <div className="container">
      <h1 className="page-title">사용자 관리 실습</h1>
      <p className="page-description">
        Query Invalidation과 Loading, Fetching, Error 상태를 화면에서 구분하여 확인한다.
      </p>

      <div className="panel">
        <UserForm onAdd={handleAddUser} isPending={mutation.isPending} />

        {/* 초기 로딩 상태 - 초기 화면 진입시 목록 데이터가 아직 없는 구간 */}
        {isLoading && (
          <div className="status-box status-loading">
            초기 데이터를 불러오는 중입니다.
          </div>
        )}

        {/* 새 데이터 반영 - 기존 데이터는 이미 있지만 다시 서버에 최신 상태를 확인하러 가는 구간 */}
        {!isLoading && isFetching && (
          <div className="status-box status-fetching">
            목록을 최신 상태로 다시 확인하는 중입니다.
          </div>
        )}

        {/* 생성 요청 진행 상태 */}
        {mutation.isPending && (
          <div className="status-box status-mutation">
            사용자 정보를 서버에 저장하는 중입니다.
          </div>
        )}

        {/* 조회 실패시 오류 메시지를 보여주는 구문 */}
        {error && (
          <div className="status-box status-error">
            오류가 발생했습니다: {error.message}
          </div>
        )}
      </div>
      
      {/* 실제 목록 표시 영역 */}
      <div className="panel">
        <h2 className="list-title">사용자 목록</h2>
        {/* data가 아직 없을 수 있으므로 기본값으로 빈 배열을 넘김 */}
        <UserList users={data || []} />
      </div>
    </div>
  );
}

export default App;