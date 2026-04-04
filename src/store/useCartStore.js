import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addToCart: (product) => set((state) => {
        const existingItem = state.items.find(
          (item) => item.id === product.id && item.size === product.size
        );
        
        let newItems;
        if (existingItem) {
          newItems = state.items.map((item) =>
            item.id === product.id && item.size === product.size
              ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
              : item
          );
        } else {
          newItems = [...state.items, { ...product, quantity: product.quantity || 1 }];
        }

        const newTotal = newItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        return { items: newItems, total: newTotal };
      }),

      removeFromCart: (id, size) => set((state) => {
        const newItems = state.items.filter((item) => !(item.id === id && item.size === size));
        const newTotal = newItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        return { items: newItems, total: newTotal };
      }),

      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'nike-shop-cart',
    }
  )
);

export default useCartStore;

