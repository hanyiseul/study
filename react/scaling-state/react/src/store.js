import { create } from 'zustand'; // zustand store를 생성하기 위한 함수 호출

// 전역 상태 저장소 만듦 -> 이 저장소는 여러 컴포넌트에서 동일하게 접근 가능
const useStore = create((set) => ({
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }))
}));

export default useStore;