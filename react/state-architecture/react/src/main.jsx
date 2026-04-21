import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Reacy Query를 앱 전체에서 사용할 수 있도록 필요한 객체를 불러옴
import App from './App';

const queryClient = new QueryClient(); // React Query가 서버 상태를 캐싱하고 관리할 중앙 캐시 객체를 생성

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);