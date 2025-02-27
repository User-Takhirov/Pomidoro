import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./Reducers/products-reducer";
import { loadState, saveState } from "../config/Storage";
export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  preloadedState: {
    items: loadState("Task"),
  },
});

store.subscribe(() => {
  saveState("Task", store.getState().items);
});
