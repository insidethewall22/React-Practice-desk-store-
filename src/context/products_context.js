import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url, single_product_url } from "../utils/constants";
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

const initialState = {
  products: [],
  singleProduct: {},
  featuredProducts: [],
  isLoading: false,
  isError: { error: false, msg: "" },
  single_product_Loading: false,
  single_product_Error: { error: false, msg: "" },
  sideBar: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
    console.log(state.sideBar);
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
  const fetchProducts = async () => {
    try {
      dispatch({ type: GET_PRODUCTS_BEGIN });
      const response = await axios(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_PRODUCTS_ERROR, payload: err });
    }
  };
  const fetchSingleProduct = async (id) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
      const response = await axios(`${single_product_url}${id}`);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: err });
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ProductsContext.Provider
      value={{ ...state, fetchSingleProduct, openSidebar, closeSidebar }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
