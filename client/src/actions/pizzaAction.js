import axios from "axios";

export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pizzas/getAllPizzas`);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (err) {
    dispatch({ type: "GET_PIZZAS_FAIL", payload: err });
  }
};

