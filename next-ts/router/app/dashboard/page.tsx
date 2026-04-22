import { getUsers } from '../../lib/data';
import SearchBox from './SearchBox';

export default async function DashboardPage() {
  const users = await getUsers();

  return (
    <div>
      <h3>대시보드 메인</h3>
      <p>이 페이지는 서버 컴포넌트다.</p>

      <SearchBox />

      <table border={1} cellPadding={10} style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>역할</th>
          </tr>
        </thead>
        <tbody>
          {users.map(function (user) {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}