import { create } from 'zustand';

type UiStore = {
  theme: 'light' | 'dark';
  userProfile: {
    name: string;
    role: string;
  };
  toggleTheme: () => void;
};

const useUiStore = create<UiStore>(function (set) {
  return {
    theme: 'light',
    userProfile: {
      name: '관리자',
      role: 'WMS Admin',
    },
    toggleTheme: function () {
      set(function (state) {
        return {
          theme: state.theme === 'light' ? 'dark' : 'light',
        };
      });
    },
  };
});

export default useUiStore;