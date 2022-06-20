import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../reducers/rootReducer";

const store: any = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV != "production",
  });

const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV != "production",
});

export default wrapper;
