import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const NotificationReducer = createSlice({
  name: "notification",
  initialState: {
    notificationStatus: false,
  },
  reducers: {
    setNotificationStatus: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        notificationStatus: action.payload,
      };
    },
  },
});
export const { setNotificationStatus } = NotificationReducer.actions;
export default NotificationReducer.reducer;
