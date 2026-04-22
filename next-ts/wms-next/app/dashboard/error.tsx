 'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h3>대시보드 오류</h3>
      <p>{error.message}</p>
      <button type="button" onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}