// Local State
import { useState } from 'react';

function SearchBox() {
  // 컴포넌트 내부에서만 사용하는 검색 입력값 상태
  // 이 값은 다른 컴포넌트와 공유되지 않음
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