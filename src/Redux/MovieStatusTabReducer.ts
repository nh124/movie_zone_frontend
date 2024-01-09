import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import ResponseResultType from "../Types/ResponseResultType";

export const MovieStatusTab = createSlice({
  name: "UpcomingMoviePageIndex",
  initialState: {
    currentList: "Trending",
    currentTab: [] as ResponseResultType[],
  },
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        currentList: action.payload,
      };
    },
    setCurrentTab: (state, action: PayloadAction<ResponseResultType[]>) => {
      return {
        ...state,
        currentTab: action.payload,
      };
    },
    upDateCurrentTab: (state, action: PayloadAction<ResponseResultType[]>) => {
      return {
        ...state,
        currentTab: [...state.currentTab, ...action.payload],
      };
    },
  },
});
export const { setTab, setCurrentTab, upDateCurrentTab } =
  MovieStatusTab.actions;
export default MovieStatusTab.reducer;
