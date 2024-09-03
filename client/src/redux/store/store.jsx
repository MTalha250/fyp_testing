import { configureStore } from "@reduxjs/toolkit";
import DataSave from "../reducers/DataSave";

export const store = configureStore({
  reducer: {
    dataSave: DataSave,
  },
});

