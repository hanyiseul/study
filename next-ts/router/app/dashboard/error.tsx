'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h3>대시보드 오류</h3>
      <p>{error.message}</p>
      <button onClick={function () {
        reset();
      }}>
        다시 시도
      </button>
    </div>
  );
}