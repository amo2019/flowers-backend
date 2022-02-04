import axios from "axios";
import { productFailure, productStart, productSuccess } from "./ProductActions";

export const product = async (user, dispatch) => {
  dispatch(productStart());
  try {
    const res = await axios.post("product", user);
    dispatch(productSuccess(res.data));
  } catch (err) {
    dispatch(productFailure());
  }
};
