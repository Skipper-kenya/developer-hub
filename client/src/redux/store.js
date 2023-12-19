import { createStore } from "redux";
import detailsReducer from "./details/detailsReducer";
const store = createStore(detailsReducer);
export default store;
