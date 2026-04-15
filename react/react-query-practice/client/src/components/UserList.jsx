function UserList({ users }) {
  return (
    <div className="panel">
      <h2>사용자 목록</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>부서</th>
            <th>갱신 시각</th>
          </tr>
        </thead>
        <tbody>
          {users.map(function (user) {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.department}</td>
                <td>{user.updatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;