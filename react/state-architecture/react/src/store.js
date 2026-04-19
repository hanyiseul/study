import { create } from 'zustand';

const useStore = create((set) => ({
  theme: 'light',
  form: {
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