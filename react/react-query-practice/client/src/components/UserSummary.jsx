import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/usersApi';

function UserSummary() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5000
  });

  return (
    <div className="panel">
      <h2>사용자 요약</h2>
      <p>총 인원: {data ? data.length : 0}명</p>
    </div>
  );
}

export default UserSummary;