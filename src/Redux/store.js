import { configureStore } from "@reduxjs/toolkit";
import cocktailSlice from "./Slices/cocktailSlice";

export default configureStore({
  reducer: {
    app: cocktailSlice,
  },
});
