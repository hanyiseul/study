import { useAtom } from 'jotai';
import {
  searchAtom,
  categoryAtom,
  sortAtom
} from '../atoms/filterAtom';

const products = [
  { id: 1, name: '노트북', category: '전자기기', price: 1500000 },
  { id: 2, name: '키보드', category: '전자기기', price: 120000 },
  { id: 3, name: '리액트 입문', category: '도서', price: 32000 },
  { id: 4, name: '자바스크립트 문법', category: '도서', price: 28000 },
  { id: 5, name: '사과주스', category: '식품', price: 4500 },
  { id: 6, name: '견과세트', category: '식품', price: 19000 }
];

function ProductList() {
  const [search] = useAtom(searchAtom);
  const [category] = useAtom(categoryAtom);
  const [sort] = useAtom(sortAtom);

  let filteredProducts = products.filter(function (item) {
    const matchSearch = item.name.includes(search);
    const matchCategory =
      category === '전체' || item.category === category;

    return matchSearch && matchCategory;
  });

  filteredProducts.sort(function (a, b) {
    if (sort === 'name') {
      return a.name.localeCompare(b.name, 'ko');
    }

    return a.price - b.price;
  });

  return (
    <section className="card">
      <h2>상품 목록</h2>

      <ul className="product-list">
        {filteredProducts.map(function (item) {
          return (
            <li key={item.id} className="product-item">
              <strong>{item.name}</strong>
              <span>{item.category}</span>
              <span>{item.price.toLocaleString()}원</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ProductList;