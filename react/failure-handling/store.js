import { create } from 'zustand'; // Zustand Store를 생성하기 위한 함수

const useStore = create((set) => ({ // 전역 상태 저장소를 만듦
  theme: 'light',
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    }))
}));

export default useStore;