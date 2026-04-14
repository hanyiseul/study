import { create } from 'zustand';

const useCounterStore = create(function (set) {
  return {
    count: 0,
    increase: function () {
      set(function (state) {
        return { count: state.count + 1 };
      });
    },
    decrease: function () {
      set(function (state) {
        return { count: state.count - 1 };
      });
    },
    reset: function () {
      set({ count: 0 });
    }
  };
});

export default useCounterStore;