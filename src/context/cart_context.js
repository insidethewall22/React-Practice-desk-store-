import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};
const initialState = {
  cart: getLocalStorage(),
  totalPrice: 0,
  totalAmount: 0,
  shipping_fee: 0,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  useEffect(() => {
    countTotal();
  }, [state.totalPrice, state.totalAmount]);
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  const deleteItem = (combinationID) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: { combinationID },
    });
  };
  const toggleCart = (op, id) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { op, itemID: id },
    });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  const countTotal = () => {
    dispatch({ type: COUNT_CART_TOTALS });
  };

  return (
    <CartContext.Provider
      value={{ addToCart, deleteItem, ...state, toggleCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
