import { createSlice } from "@reduxjs/toolkit";
const initialWatched = JSON.parse(localStorage.getItem("watchedList")) || [];
const initialWatch = JSON.parse(localStorage.getItem("watchList")) || [];
const initialLists = { watchList: initialWatch, watchedList: initialWatched };
export const listsSlice = createSlice({
  name: "lists",
  initialState: initialLists,
  reducers: {
    addToWatchList: (state, action) => {
      state.watchList = [...state.watchList, action.payload];
    },
    addToWatchedList: (state, action) => {
      state.watchedList = [...state.watchedList, action.payload];
    },
    removeFromWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (el) => el.id !== action.payload
      );
    },
    removeFromWatchedList: (state, action) => {
      state.watchedList = state.watchedList.filter(
        (el) => el.id !== action.payload
      );
    },
    clearWatchList: (state) => {
      state.watchList = [];
    },
    clearWatchedList: (state) => {
      state.watchedList = [];
    },
  },
});

export default listsSlice.reducer;
export const {
  addToWatchList,
  addToWatchedList,
  removeFromWatchList,
  removeFromWatchedList,
  clearWatchList,
  clearWatchedList,
} = listsSlice.actions;
