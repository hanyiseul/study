import { create } from 'zustand'; // zustand store를 생성하기 위한 함수 호출

// 전역 상태 저장소 만듦 -> 이 저장소는 여러 컴포넌트에서 동일하게 접근 가능
const useStore = create((set) => ({
  theme: 'light', // 전역 UI 상태의 예시로 현재 테마값 저장
  toggleTheme: () =>
    set((state) => ({ // 여러 화면에서 공유되는 단순 UI 상태는 Zustand로 관리하기 적합
      theme: state.theme === 'light' ? 'dark' : 'light'
    }))
}));

export default useStore;