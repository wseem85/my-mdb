import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./features/lists/listsSlice";
export const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
});
store.subscribe(() => {
  const { lists } = store.getState(); // Assuming  are relevant slices

  const { watchList, watchedList } = lists;

  localStorage.setItem("watchList", JSON.stringify(watchList));
  localStorage.setItem("watchedList", JSON.stringify(watchedList));
});
