import React, { createContext, useReducer, useContext } from "react";
import { cartsReducer, initialCartsState, CartsState, CartsAction } from "../reducers/CartReducer";

// Define CartContextType
type CartContextType = {
  state: CartsState;
  dispatch: React.Dispatch<CartsAction>;
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider to provide the state and dispatch
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartsReducer, initialCartsState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use CartContext
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
