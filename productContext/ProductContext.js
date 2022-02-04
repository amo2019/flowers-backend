import ProductReducer from "./ProductReducer";
import { createContext, useEffect, useReducer } from "react";
import flowers from "../perfume.json";

const INITIAL_STATE = {
  product: flowers,
  isFetching: false,
  error: false,
};

export const ProductContext = createContext(INITIAL_STATE);

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, INITIAL_STATE);
  console.log("F:", flowers)

  return (
    <ProductContext.Provider
      value={{
        product: state.product,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
