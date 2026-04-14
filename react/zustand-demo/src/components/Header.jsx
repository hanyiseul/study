import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

function Header() {
  const isLoggedIn = useAuthStore(function (state) {
    return state.isLoggedIn;
  });

  const user = useAuthStore(function (state) {
    return state.user;
  });

  const totalCount = useCartStore(function (state) {
    return state.getTotalCount();
  });

  return (
    <header className="header">
      <div>
        <h1>Zustand 통합 실습</h1>
        <p>
          {isLoggedIn ? user.name + '님 로그인 중' : '로그인되지 않음'}
        </p>
      </div>

      <div className="header-right">
        <span>장바구니 수량: {totalCount}</span>
      </div>
    </header>
  );
}

export default Header;