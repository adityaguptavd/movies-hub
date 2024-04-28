import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice.js";

const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
});

export default store;