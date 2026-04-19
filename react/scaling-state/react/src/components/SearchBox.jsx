import { useState } from 'react';

function SearchBox() {
  // 해당 컴포넌트 내부에서만 필요하므로 local state로 관리
  const [keyword, setKeyword] = useState('');

  return (
    <input
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="검색"
    />
  );
}

export default SearchBox;