import { createSlice } from "@reduxjs/toolkit";

const dataslice = createSlice({
  name: "data",
  initialState: [],
  reducers: {
    addData(state, action) {
      console.log("storfirst", action.payload);
      const d = state.push(action.payload);
      console.log("store", d);
    },
  },
});
export const { addData } = dataslice.actions;
export default dataslice.reducer;
