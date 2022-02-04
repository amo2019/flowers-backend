import { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { useQuery } from "react-query";
import flowers from "../flowers.json";

  
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: flowers,
    searchField: '',
    headerStatus: true,
  },
  reducers: {
    filteredProducts: (state, action) => {
      console.log("action:", action.payload)
      state.products = action.payload;
    },
    filteredField: (state, action) => {
      state.searchField = action.payload;
    },
    setHeaderStatus: (state, action) => {
      state.headerStatus = action.payload;
    },
    reset: (state) => {
      state.products = [];
    },
  },
});

export const { filteredProducts, filteredField, setHeaderStatus, reset } = productSlice.actions;
export default productSlice.reducer;
