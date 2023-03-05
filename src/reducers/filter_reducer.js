import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case SET_LISTVIEW:
      return { ...state, isGridView: false };
    case SET_GRIDVIEW:
      return { ...state, isGridView: true };
    case LOAD_PRODUCTS:
      const prices = action.payload.map((item) => {
        return item.price;
      });
      const max_price = Math.max(...prices);
      return {
        ...state,
        allProducts: action.payload,
        filterProducts: action.payload,
        filter: {
          ...state.filter,
          max_price,
          price: max_price,
        },
      };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          [name]: value,
        },
      };
    case UPDATE_SORT:
      return {
        ...state,
        sortChoice: action.payload,
      };
    case SORT_PRODUCTS:
      const sortType = state.sortChoice;
      console.log(sortType);
      if (sortType === "price-highest") {
        return {
          ...state,
          filterProducts: state.filterProducts.sort(
            (a, b) => b.price - a.price
          ),
        };
      }

      if (sortType == "name-az") {
        return {
          ...state,
          filterProducts: state.filterProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        };
      }
      if (sortType === "name-za") {
        return {
          ...state,
          filterProducts: state.filterProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          ),
        };
      }
      return {
        ...state,
        filterProducts: state.filterProducts.sort((a, b) => {
          return a.price - b.price;
        }),
      };
    case FILTER_PRODUCTS:
      const { allProducts } = state;
      const { category, company, color, price, shipping, text } = state.filter;
      let temProducts = [...allProducts];
      if (text) {
        temProducts = temProducts.filter(
          (product) =>
            product.name.includes(text) ||
            product.price.toString().includes(text)
        );
      }
      if (category && category !== "all") {
        temProducts = temProducts.filter(
          (product) => product.category === category
        );
      }
      if (company && company !== "all") {
        temProducts = temProducts.filter(
          (product) => product.company === company
        );
      }
      if (color && color !== "all") {
        temProducts = temProducts.filter((product) =>
          product.colors.includes(color)
        );
      }
      if (price) {
        temProducts = temProducts.filter(
          (product) => Number(product.price) <= price
        );
      }
      if (shipping) {
        temProducts = temProducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filterProducts: temProducts };
    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          category: "all",
          company: "all",
          color: "all",
          min_price: 0,
          price: state.filter.max_price,
          shipping: false,
          text: "",
        },
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
