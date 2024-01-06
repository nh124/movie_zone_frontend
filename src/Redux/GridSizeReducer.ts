import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export const GridSize = createSlice({
  name: "GridSize",
  initialState: {
    length: 0,
  },
  reducers: {
    setLength: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        length: action.payload,
      };
    },
  },
});
export const { setLength } = GridSize.actions;
export default GridSize.reducer;
