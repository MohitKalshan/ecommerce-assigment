import { combineReducers } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import filtersReducer from "./slices/filtersSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const rootReducer = combineReducers({
  productsReducer,
  filtersReducer,
  favoritesReducer,
});

export type RootReducer = typeof rootReducer;
