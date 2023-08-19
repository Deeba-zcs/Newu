"use client";
import { Provider } from "react-redux";
import store from "src/app/Store/page.js";
function StoreProvider({ children }) {
  return <Provider store={store}>{children} </Provider>;
}

export default StoreProvider;
