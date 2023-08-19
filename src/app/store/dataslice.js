import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",

  initialState: { currentdata: [] },
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
      const { id, selectedType, selectedDate, selectedTime, newData } =
        action.payload;
      console.log(
        "id,selectedtype,selctedData,selectedTime",
        id,
        selectedType,
        selectedDate,
        selectedTime
      );

      const index = state.currentdata.findIndex(
        (item) =>
          item.id === id &&
          item.body.type === selectedType &&
          item.body.date === selectedDate
      );

      if (index !== -1) {
        const editedItem = { ...state.currentdata[index] };
        editedItem.body = { ...editedItem.body, ...newData };

        state.currentdata.splice(index, 1, editedItem);
      }
    },
  },
});

export const { addData, removeData, editData } = dataSlice.actions;
export default dataSlice.reducer;
