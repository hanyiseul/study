'use client';

import { useState } from 'react';

export default function SearchBox() {
  const [keyword, setKeyword] = useState('');

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <input
        type="text"
        value={keyword}
        onChange={function (e) {
          setKeyword(e.target.value);
        }}
        placeholder="검색어 입력"
        style={{ padding: '8px', width: '300px' }}
      />
      <p>현재 입력값: {keyword}</p>
    </div>
  );
}