export const fetchStart = () => ({
  type: "FETCH_START",
});
export const fetchSuccess = (user) => ({
  type: "FETCH_SUCCESS",
  payload: user,
});
export const fetchFailure = () => ({
  type: "FETCH_FAILURE",
});
