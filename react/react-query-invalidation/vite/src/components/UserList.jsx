function UserList({ users }) {
  if (!users.length) { // 데이터가 비어 있을 때의 예외 처리
    return <div className="empty-box">표시할 사용자 데이터가 없습니다.</div>;
  }

  return (
    <div className="user-list">
      {users.map(function (user) {
        return (
          <div key={user.id} className="user-item">
            <div className="user-name">{user.name}</div>
            <div className="user-id">ID: {user.id}</div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;