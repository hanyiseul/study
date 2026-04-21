import { create } from 'zustand'; // Zustand store를 생성하기 위한 함수를 불러옴

const useStore = create((set) => ({
  theme: 'light', // 전역 UI 상태의 예시로 현재 테마 값을 저장
  form: { // 뱅킹입력 폼 상태 저장 -> 서버에 전송되기 전까지는 브라우저 내부 상태이므로 Client State
    sender_name: '',
    amount: ''
  },

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light'
    })),

  // 폼의 특정 필드 갱신
  // 입력창마다 별도 상태를 두지 않고 하나의 전역 폼 객체로 관리
  setForm: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value
      }
    }))
}));

export default useStore;