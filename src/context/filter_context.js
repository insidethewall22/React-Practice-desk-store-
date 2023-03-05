import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  isGridView: false,
  sortChoice: "price-lowest",
  filterProducts: [],
  allProducts: [],
  filter: {
    category: "all",
    company: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
    text: "",
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
    console.log(state.filterProducts);
  }, [state.filter, state.sortChoice]);

  const setGridview = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListview = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  // const loadProducts = () => {
  //   dispatch({ type: LOAD_PRODUCTS, payload: products });
  // };
  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "category") {
      value = e.target.textContent;
    }
    if (name == "color") {
      console.log(e.target.dataset);
      value = e.target.dataset.color;
    }
    if (name == "price") {
      value = Number(value);
    }
    if (name == "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        // loadProducts,
        setGridview,
        setListview,
        updateFilters,
        updateSort,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
