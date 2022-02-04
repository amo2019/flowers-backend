const ProductReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        product: null,
        isFetching: true,
        error: false,
      };
    case "FETCH_SUCCESS":
    console.log("a::", action.payload);
      return {
        product: action.payload,
        isFetching: false,
        error: false,
      };
    case "FETCH_FAILURE":
      return {
        product: null,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default ProductReducer;
