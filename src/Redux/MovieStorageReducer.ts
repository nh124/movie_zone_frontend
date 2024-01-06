import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const MovieStorageSlicer = createSlice({
  name: "MovieStorage",
  initialState: {
    TrendingMovies: [],
    UpcomingMovies: [],
    NowPlayingMovies: [],
  },
  reducers: {
    updateTrendingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        TrendingMovies: action.payload,
      };
    },
    addToTrendingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        TrendingMovies: [...state.TrendingMovies, ...action.payload],
      };
    },

    updateUpcomingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        UpcomingMovies: action.payload,
      };
    },
    addToUpcomingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        UpcomingMovies: [...state.UpcomingMovies, ...action.payload],
      };
    },
    updateNowPlayingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        NowPlayingMovies: action.payload,
      };
    },
    addToNowPlayingMovies: (state, action: PayloadAction<[]>) => {
      return {
        ...state,
        NowPlayingMovies: [...state.NowPlayingMovies, ...action.payload],
      };
    },
  },
});
export const {
  updateTrendingMovies,
  addToTrendingMovies,
  updateUpcomingMovies,
  addToUpcomingMovies,
  updateNowPlayingMovies,
  addToNowPlayingMovies,
} = MovieStorageSlicer.actions;
export default MovieStorageSlicer.reducer;
