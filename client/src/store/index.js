import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["search/addSearchData"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.date"],
        // Ignore these paths in the state
        ignoredPaths: ["date"],
      },
    }),
});
