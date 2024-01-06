import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const filterReducer = createSlice({
  name: "filter",
  initialState: {
    filters: {
      sort_by: "",
      vote_average: "",
      year: "",
      genre: "",
    },
    submitFilter: false,
  },
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ name: string; filter: any }>
    ) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.filter,
        },
      };
    },
    setSubmitFilter: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        submitFilter: action.payload,
      };
    },
  },
});
export const { setFilter, setSubmitFilter } = filterReducer.actions;
export default filterReducer.reducer;
