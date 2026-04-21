import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // React Query를 앱 전체에 살용할 수 있도록 필요한 객체 불러옴
import App from './App';

const queryClient = new QueryClient(); // React Query가 서버 상태를 캐싱하고 관리할 중앙 캐시 객체 생성

// 하위 컴포넌트 전체에서 useQuery, useMutation 등을 사용할 수 있게 함
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);