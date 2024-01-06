import { configureStore } from "@reduxjs/toolkit";
import MovieIndexReducer from "./MovieIndexReducer";
import GridSizeIndexReducer from "./GridSizeIndexReducer";
import GridSizeReducer from "./GridSizeReducer";
import MovieStatusTabReducer from "./MovieStatusTabReducer";
import MovieStorageReducer from "./MovieStorageReducer";
import filterReducer from "./filterReducer";
import NotificationReducer from "./NotificationReducer";

export default configureStore({
  reducer: {
    MovieIndex: MovieIndexReducer,
    GridSizeIndex: GridSizeIndexReducer,
    GridSize: GridSizeReducer,
    MovieStatusTab: MovieStatusTabReducer,
    MovieStorage: MovieStorageReducer,
    filters: filterReducer,
    Notification: NotificationReducer,
  },
});
