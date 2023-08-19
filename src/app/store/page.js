import { configureStore } from "@reduxjs/toolkit";

import dataslice from "src/app/Store/dataslice.js";

const store = configureStore({
  reducer: {
    data: dataslice,
  },
});
export default store;
