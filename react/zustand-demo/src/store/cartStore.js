import { create } from 'zustand';

const useCartStore = create(function (set, get) {
  return {
    items: [],

    addItem: function (product) {
      const currentItems = get().items;

      const foundItem = currentItems.find(function (item) {
        return item.id === product.id;
      });

      if (foundItem) {
        const updatedItems = currentItems.map(function (item) {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }

          return item;
        });

        set({ items: updatedItems });
      } else {
        set({
          items: currentItems.concat({
            ...product,
            quantity: 1
          })
        });
      }
    },

    removeItem: function (productId) {
      const currentItems = get().items;

      const updatedItems = currentItems
        .map(function (item) {
          if (item.id === productId) {
            return {
              ...item,
              quantity: item.quantity - 1
            };
          }

          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        });

      set({ items: updatedItems });
    },

    clearCart: function () {
      set({ items: [] });
    },

    getTotalCount: function () {
      return get().items.reduce(function (sum, item) {
        return sum + item.quantity;
      }, 0);
    }
  };
});

export default useCartStore;