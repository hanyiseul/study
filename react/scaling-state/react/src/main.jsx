import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 리액트쿼리를 앱 전체에서 사용할수 있도록 필요한 객체 호출
import App from './App';

const queryClient = new QueryClient(); // 리액트쿼리가 서버 상태를 캐싱하고 관리할 중앙 캐시 객체 생성

ReactDOM.createRoot(document.getElementById('root')).render(
  // 하위컴포넌트 전체에서 useQuery, useMutation 등을 사용할 수 있게 함
  <QueryClientProvider client={queryClient}> 
    <App />
  </QueryClientProvider>
);