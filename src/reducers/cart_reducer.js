import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const sameProduct = state.cart.find(
        (element) => element.id === id + color
      );
      if (sameProduct && sameProduct.max >= sameProduct.amount + amount) {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...sameProduct,
              amount: sameProduct.amount + amount,
              subtotal: sameProduct.subtotal + product.price * amount,
            },
          ],
          totalPrice: state.totalPrice + product.price * amount,
          totalAmount: state.totalAmount + amount,
        };
      } else if (sameProduct && sameProduct.max < sameProduct.amount + amount) {
        return {
          ...state,
          cart: [
            ...state.cart,
            {
              ...sameProduct,
              amount: sameProduct.max,
              subtotal: product.price * sameProduct.max,
            },
          ],
          totalPrice:
            state.totalPrice +
            product.price * (sameProduct.max - sameProduct.amount),
          totalAmount: state.totalAmount + sameProduct.max - sameProduct.amount,
        };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          max: product.stock,
          amount: amount,
          color,
          image: product.images[0].url,
          price: product.price,
          subtotal: product.price * amount,
          shipping: product.shipping,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
          totalPrice: state.totalPrice + amount * product.price,
          totalAmount: state.totalAmount + amount,
        };
      }
    case REMOVE_CART_ITEM:
      const { combinationID } = action.payload;
      const remove_item = state.cart.find((item) => item.id === combinationID);
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== combinationID),
        totalPrice: state.totalPrice - remove_item.subtotal,
        totalAmount: state.totalAmount - remove_item.amount,
      };
    case TOGGLE_CART_ITEM_AMOUNT:
      const { itemID, op } = action.payload;
      let target = state.cart.find((item) => item.id === itemID);
      if (op === "increase") {
        if (target.amount < target.max) {
          return {
            ...state,
            cart: state.cart.map((item) => {
              let newAmount = item.amount + 1;
              if (item.id === target.id) {
                return {
                  ...item,
                  amount: newAmount,
                  subtotal: newAmount * item.price,
                };
              } else {
                return { ...item };
              }
            }),
            totalPrice: state.totalPrice + target.price,
            totalAmount: state.totalAmount + 1,
          };
        }
      }
      if (op === "decrease") {
        if (target.amount > 1) {
          //target.amount -= 1;

          return {
            ...state,
            cart: state.cart.map((item) => {
              let newAmount = item.amount - 1;
              if (item.id === target.id) {
                return {
                  ...item,
                  amount: newAmount,
                  subtotal: newAmount * item.price,
                };
              } else {
                return { ...item };
              }
            }),
            totalPrice: state.totalPrice - target.price,
            totalAmount: state.totalAmount - 1,
          };
        }
        if (target.amount === 1) {
          return {
            ...state,
            cart: state.cart.filter((item) => item.id !== target.id),
            totalPrice: state.totalPrice - target.price,
            totalAmount: state.totalAmount - 1,
          };
        }
      }
      return { ...state };
    case CLEAR_CART:
      return { cart: [], totalPrice: 0, totalAmount: 0, shipping_fee: 0 };
    case COUNT_CART_TOTALS:
      return {
        ...state,
        totalAmount: state.cart.reduce(
          (total, current) => total + current.amount,
          0
        ),
        totalPrice: state.cart.reduce(
          (total, current) => total + current.subtotal,
          0
        ),
      };

      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
