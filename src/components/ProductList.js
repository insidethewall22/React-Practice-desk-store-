import React, { useEffect } from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { allProducts, loadProducts, isGridView, filterProducts } =
    useFilterContext();
  console.log(filterProducts);
  return (
    <>
      {isGridView ? (
        <GridView products={filterProducts} />
      ) : (
        <ListView products={filterProducts} />
      )}
    </>
  );
};

export default ProductList;
