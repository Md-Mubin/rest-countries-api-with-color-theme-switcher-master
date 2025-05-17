import { configureStore } from "@reduxjs/toolkit";
import countrySlice from "./Slices/countrySlice";

export const mainStore = configureStore({
  reducer: countrySlice
});