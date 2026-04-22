type Props = {
  error: Error;
  onRetry: () => void;
};

export default function ErrorFallback({ error, onRetry }: Props) {
  return (
    <div className="status-panel">
      <p className="status-text error-text">
        서비스 연결에 문제가 발생했습니다.
      </p>
      <p className="status-text">
        잠시 후 다시 시도해 주시기 바랍니다.
      </p>
      <p className="status-text">
        동일한 문제가 반복되면 네트워크 상태를 확인해 주십시오.
      </p>
      <p className="status-text error-text">
        오류 내용: {error.message}
      </p>
      <button type="button" className="hero-button" onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
}