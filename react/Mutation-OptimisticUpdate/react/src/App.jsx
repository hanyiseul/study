import { useQuery } from '@tanstack/react-query';
import { fetchTransfers } from './api/transfersApi';
import TransferForm from './components/TransferForm';
import TransferSummary from './components/TransferSummary';
import TransferList from './components/TransferList';

function App() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['transfers'],
    queryFn: fetchTransfers,
    staleTime: 5000
  });

  return (
    <div className="container">
      <h1>금융 거래 등록 실습</h1>
      <p className="description">
        React Query의 Mutation과 Optimistic Update 동작을 확인한다.
      </p>

      <TransferForm />

      <div className="panel">
        {isLoading && <p className="status">최초 로딩 중입니다.</p>}
        {!isLoading && isFetching && (
          <p className="status">최신 데이터를 확인하는 중입니다.</p>
        )}
        {error && <p className="status error">{error.message}</p>}
      </div>

      {data && (
        <>
          <TransferSummary transfers={data} />
          <TransferList transfers={data} />
        </>
      )}
    </div>
  );
}

export default App;