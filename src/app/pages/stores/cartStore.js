import { signify } from "react-signify";

// Lưu trữ và thông báo thay đổi trạng thái giỏ hàng
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

const cartStore = signify({
  state: {
    cart: [], // Giỏ hàng ban đầu rỗng
  },
  actions: {
    addToCart(state, product, quantity, size) {
      const existingProduct = state.cart.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart.push({ ...product, quantity, size });
      }
      notifyListeners(); // Thông báo thay đổi
    },
    removeFromCart(state, productId, size) {
      state.cart = state.cart.filter(
        (item) => item.id !== productId || item.size !== size
      );
      notifyListeners(); // Thông báo thay đổi
    },
    clearCart(state) {
      state.cart = [];
      notifyListeners(); // Thông báo thay đổi
    },
  },
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback); // Hủy đăng ký
  },
});

export default cartStore;