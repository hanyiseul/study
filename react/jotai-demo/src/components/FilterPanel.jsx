import { useAtom } from 'jotai';
import {
  searchAtom,
  categoryAtom,
  sortAtom
} from '../atoms/filterAtom';

function FilterPanel() {
  const [search, setSearch] = useAtom(searchAtom);
  const [category, setCategory] = useAtom(categoryAtom);
  const [sort, setSort] = useAtom(sortAtom);

  return (
    <section className="card">
      <h2>필터 / 검색 조건 분리</h2>

      <div className="filter-row">
        <input
          type="text"
          placeholder="상품명 검색"
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
        />

        <select
          value={category}
          onChange={function (e) {
            setCategory(e.target.value);
          }}
        >
          <option value="전체">전체</option>
          <option value="전자기기">전자기기</option>
          <option value="도서">도서</option>
          <option value="식품">식품</option>
        </select>

        <select
          value={sort}
          onChange={function (e) {
            setSort(e.target.value);
          }}
        >
          <option value="name">이름순</option>
          <option value="price">가격순</option>
        </select>
      </div>
    </section>
  );
}

export default FilterPanel;