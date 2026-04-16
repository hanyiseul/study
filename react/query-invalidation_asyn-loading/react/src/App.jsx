import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from './api/ticketsApi';
import TicketForm from './components/TicketForm';
import TicketSummary from './components/TicketSummary';
import TicketTable from './components/TicketTable';

function App() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
    staleTime: 0
  });

  return (
    <div className="container">
      <h1>고객 문의 관리 실습</h1>
      <p className="description">
        Query Invalidation과 비동기 상태 UI 대응 구조를 확인한다.
      </p>

      <TicketForm />

      <div className="panel">
        {isLoading && <p className="status">문의 목록을 불러오는 중입니다.</p>}

        {!isLoading && isFetching && (
          <p className="status">최신 문의 데이터를 다시 확인하는 중입니다.</p>
        )}

        {error && <p className="status error">{error.message}</p>}
      </div>

      {data && !isLoading && !error && (
        <>
          <TicketSummary tickets={data} />
          <TicketTable tickets={data} />
        </>
      )}
    </div>
  );
}

export default App;