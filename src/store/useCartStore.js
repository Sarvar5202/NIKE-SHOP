import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addToCart: (item) => set((state) => ({
    items: [...state.items, item],
    total: state.total + item.price * (item.quantity || 1),
  })),
  removeFromCart: (id) => set((state) => {
    const itemToRemove = state.items.find(item => item.id === id);
    if (!itemToRemove) return state;
    return {
      items: state.items.filter(item => item.id !== id),
      total: state.total - itemToRemove.price * (itemToRemove.quantity || 1),
    };
  }),
}));

export default useCartStore;
