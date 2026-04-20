// main.jsx : react 애플리케이션 진입점 , react Query를 전체 애플리케이션에 연결
// 서버 상태 관리 환경을 준비하는 가장 바깥 계층
import React from 'react';
import ReactDOM from 'react-dom/client'; // 루트 렌더링 기능
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react query의 핵심 구성 요소
import App from './App';

const queryClient = new QueryClient(); // React Query가 내부적으로 사용할 캐시 관리자 객체를 생성하는 코드
// 이 객체 안에 Query 데이터, 로딩 상태, 오류 상태, 무효화 대상, 재조회 정보가 저장됨

ReactDOM.createRoot(document.getElementById('root')).render( // react 애플리케이션을 실제 브라우저 화면에 연결하는 동작

  // QueryClient를 전체 컴포넌트트리에 주입하는 역할
  // App을 Provider 안에 감싸야 하위 컴포넌트 어디서든 사용 가능
  <QueryClientProvider client={queryClient}> 
    <App />
  </QueryClientProvider>
);