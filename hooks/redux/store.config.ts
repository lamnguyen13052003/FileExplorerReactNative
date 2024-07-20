import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from "./slice/theme.slice.ts";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    themeRedux: themeReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

