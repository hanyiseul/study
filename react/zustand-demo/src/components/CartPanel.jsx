import useCartStore from '../store/cartStore';

function CartPanel() {
  const items = useCartStore(function (state) {
    return state.items;
  });

  const removeItem = useCartStore(function (state) {
    return state.removeItem;
  });

  const clearCart = useCartStore(function (state) {
    return state.clearCart;
  });

  return (
    <section className="card">
      <h2>장바구니 상태관리</h2>

      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul className="product-list">
            {items.map(function (item) {
              return (
                <li key={item.id} className="product-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      수량: {item.quantity} / 금액: {(item.price * item.quantity).toLocaleString()}원
                    </p>
                  </div>

                  <button onClick={function () {
                    removeItem(item.id);
                  }}>
                    제거
                  </button>
                </li>
              );
            })}
          </ul>

          <button onClick={clearCart}>장바구니 비우기</button>
        </>
      )}
    </section>
  );
}

export default CartPanel;