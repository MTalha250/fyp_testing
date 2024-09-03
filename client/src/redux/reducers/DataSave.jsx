import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gigData: {},
};

export const DataSave = createSlice({
  name: "dataSave",
  initialState,
  reducers: {
    setGigData: (state, action) => {
      state.gigData = action.payload;
    }
  },
});

// Export the action creators
export const {
    setGigData,
} = DataSave.actions;

// Export the reducer
export default DataSave.reducer;
