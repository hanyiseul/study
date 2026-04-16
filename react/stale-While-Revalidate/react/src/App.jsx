import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './api/productsApi';
import ProductForm from './components/ProductForm';
import ProductSummary from './components/ProductSummary';
import ProductTable from './components/ProductTable';

function App() {
  const {
    data,
    isLoading,
    isFetching,
    error,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 10000
  });

  return (
    <div className="container">
      <h1>금융 상품 캐싱 실습</h1>
      <p className="description">
        React Query의 데이터 캐싱 전략과 Stale-While-Revalidate 동작을 확인한다.
      </p>

      <ProductForm />

      <div className="panel">
        {isLoading && (
          <p className="status">상품 목록을 최초 조회하는 중입니다.</p>
        )}

        {!isLoading && isFetching && (
          <p className="status">
            캐시된 데이터를 먼저 보여주고 최신 데이터를 다시 확인하는 중입니다.
          </p>
        )}

        {error && <p className="status error">{error.message}</p>}

        {!isLoading && dataUpdatedAt > 0 && (
          <p className="status info">
            마지막 캐시 갱신 시각: {new Date(dataUpdatedAt).toLocaleTimeString('ko-KR')}
          </p>
        )}
      </div>

      {data && !error && (
        <>
          <ProductSummary products={data} />
          <ProductTable products={data} />
        </>
      )}
    </div>
  );
}

export default App;