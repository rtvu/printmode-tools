import { configureStore } from "@reduxjs/toolkit";

import { colorantDictionaryReducer } from "./colorantDictionary/colorantDictionarySlice";

export const store = configureStore({
  reducer: { colorantDictionary: colorantDictionaryReducer },
});

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
