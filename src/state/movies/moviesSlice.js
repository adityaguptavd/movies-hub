import { createSlice } from "@reduxjs/toolkit";
import movies from "../../assets/data/movies.json";

export const initialState = {
    movies,
    searchResult: {},
    currentMovie: null,
}

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload.movies;
        },
        setSearchResult: (state, action) => {
            state.searchResult = action.payload.searchResult;
        },
        setCurrentMovie: (state, action) => {
            state.currentMovie = action.payload.currentMovie;
        }
    }
});

export const { setMovies, setSearchResult, setCurrentMovie } = moviesSlice.actions;
export default moviesSlice.reducer;