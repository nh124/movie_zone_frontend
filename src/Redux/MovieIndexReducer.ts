import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const MoviePageIndex = createSlice({
  name: "UpcomingMoviePageIndex",
  initialState: {
    UpcomingMoviePageIndex: 1,
    TrendingMoviePageIndex: 1,
    DiscoveryMoviePageIndex: 1,
    SearchMoviePageIndex: 1,
  },
  reducers: {
    IncrementUpcomingMoviePageIndex: (state) => {
      state.UpcomingMoviePageIndex += 1;
    },
    IncrementTrendingMoviePageIndex: (state) => {
      state.TrendingMoviePageIndex += 1;
    },
    IncrementDiscoveryMoviePageIndex: (state) => {
      state.DiscoveryMoviePageIndex += 1;
    },
    IncrementSearchMoviePageIndex: (state) => {
      state.SearchMoviePageIndex += 1;
    },
    setUpcomingMoviePageIndex: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        UpcomingMoviePageIndex: action.payload,
      };
    },
    setTrendingMoviePageIndex: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        TrendingMoviePageIndex: action.payload,
      };
    },
    setDiscoveryMoviePageIndex: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        DiscoveryMoviePageIndex: action.payload,
      };
    },
  },
});

export const {
  IncrementUpcomingMoviePageIndex,
  IncrementTrendingMoviePageIndex,
  IncrementDiscoveryMoviePageIndex,
  IncrementSearchMoviePageIndex,
  setUpcomingMoviePageIndex,
  setTrendingMoviePageIndex,
  setDiscoveryMoviePageIndex,
} = MoviePageIndex.actions;
export default MoviePageIndex.reducer;
