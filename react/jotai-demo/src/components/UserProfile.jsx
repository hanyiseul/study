import { useAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

function UserProfile() {
  const [user] = useAtom(userAtom);

  return (
    <section className="card">
      <h2>사용자 정보 일부 사용</h2>
      <p>이름: {user.name}</p>
      <p>권한: {user.role}</p>
    </section>
  );
}

export default UserProfile;