import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    case SIDEBAR_OPEN:
      return { ...state, sideBar: true };
    case SIDEBAR_CLOSE:
      return { ...state, sideBar: false };
    case GET_PRODUCTS_BEGIN:
      return { ...state, isLoading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: action.payload.filter((item) => {
          return item.featured === true;
        }),
      };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: { error: true, msg: action.payload },
      };
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_Loading: true };
    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: action.payload,
        single_product_Loading: false,
      };
    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_Loading: false,
        single_product_Error: { error: true, msg: action.payload },
      };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
