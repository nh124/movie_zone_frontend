import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const GridSizeIndex = createSlice({
  name: "GridSizeIndex",
  initialState: {
    start: 0,
    end: 0,
  },
  reducers: {
    setStart: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        start: action.payload,
      };
    },
    setEnd: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        end: action.payload,
      };
    },
  },
});
export const { setStart, setEnd } = GridSizeIndex.actions;
export default GridSizeIndex.reducer;
