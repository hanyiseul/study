import useCartStore from '../store/cartStore';

const products = [
  { id: 1, name: '노트북', price: 1500000 },
  { id: 2, name: '키보드', price: 120000 },
  { id: 3, name: '마우스', price: 80000 },
  { id: 4, name: '모니터', price: 450000 }
];

function ProductList() {
  const addItem = useCartStore(function (state) {
    return state.addItem;
  });

  return (
    <section className="card">
      <h2>상품 목록</h2>

      <ul className="product-list">
        {products.map(function (product) {
          return (
            <li key={product.id} className="product-item">
              <div>
                <strong>{product.name}</strong>
                <p>{product.price.toLocaleString()}원</p>
              </div>

              <button onClick={function () {
                addItem(product);
              }}>
                담기
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ProductList;