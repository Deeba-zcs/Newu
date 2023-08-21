import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: { currentdata: [], editobj: {} },

  reducers: {
    addData(state, action) {
      console.log("storfirst", action.payload);
      //   state.currentdata.push(action.payload);
      state.currentdata = [...state.currentdata, action.payload];
      console.log("currentuser", state.currentdata);
    },
    removeData(state, action) {
      const { id, selectedType } = action.payload;
      state.currentdata = state.currentdata.filter(
        (item) => item.id !== id || item.body.type !== selectedType
      );
    },
    editData(state, action) {
      console.log("editstore", action.payload);
      state.editobj = action.payload;
      console.log("editobj", state.editobj);
    },
    saveData(state, action) {
      const { id, newData, datad } = action.payload;
      console.log("id == newData==>datad", id, newData, datad);
      console.log("Before update:", state.currentdata);
      state.currentdata = datad.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      );

      console.log("After update:", state.currentdata);
    },

    clearEditObj(state) {
      state.editobj = {};
    },
  },
});

export const { addData, removeData, editData, clearEditObj, saveData } =
  dataSlice.actions;
export default dataSlice.reducer;
