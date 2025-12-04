import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
  (set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      // findes produktet allerede i cart?
      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        // hvis ja → opdater quantity
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // ellers → tilføj produktet med quantity = 1
      return {
        cart: [...state.cart, { ...product, quantity: 1 }],
      };

    }),

  removeFromCart: (id) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === id);

      if (!existing) return state;

      if (existing.quantity > 1) {
        return {
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          ),
        };
      }

      // hvis quantity er 1 → fjern helt
      return {
        cart: state.cart.filter((item) => item.id !== id),
      };
    }),

  getTotal: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

  getTotalQuantity: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0),

  clearCart: () => set({ cart: [] }),
}),
{
  name: "cart-storage", 
}
)
);


export default useCartStore;
