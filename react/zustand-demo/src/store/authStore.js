import { create } from 'zustand';

const useAuthStore = create(function (set) {
  return {
    user: null,
    isLoggedIn: false,

    login: function (userInfo) {
      set({
        user: userInfo,
        isLoggedIn: true
      });
    },

    logout: function () {
      set({
        user: null,
        isLoggedIn: false
      });
    }
  };
});

export default useAuthStore;