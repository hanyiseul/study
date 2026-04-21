'use client';

import { useState } from 'react';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');

  console.log('브라우저: SearchBox 렌더링');

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={keyword}
        onChange={function (e) {
          setKeyword(e.target.value);
        }}
        placeholder="검색어 입력"
        style={{ padding: '8px', width: '260px' }}
      />
      <p>현재 입력값: {keyword}</p>
    </div>
  );
}