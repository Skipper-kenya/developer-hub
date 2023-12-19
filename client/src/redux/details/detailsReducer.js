import { GET_DETAILS } from "./detailsType";

const initialState = {
  userId: "",
  userName: "",
};

const findDetails = () => {
  return window.localStorage.getItem("userDetails")
    ? JSON.parse(window.localStorage.getItem("userDetails"))
    : [];
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return findDetails();
    default:
      return state;
  }
};

export default detailsReducer;
