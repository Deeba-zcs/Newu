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
      console.log("dtatasd", datad);

      const index = datad.findIndex((item) => item.body.id === id);
      console.log("index", index);
      if (index !== -1) {
        state.currentdata[index].body = newData;
        console.log("AfterUpdate", state.currentdata[index].body);

        state.editobj = {};
        console.log("state,editobj", state.editobj);
      }
    },
    clearEditObj(state) {
      state.editobj = {};
    },
  },
});

export const { addData, removeData, editData, clearEditObj, saveData } =
  dataSlice.actions;
export default dataSlice.reducer;
