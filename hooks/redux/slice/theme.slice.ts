import { Theme } from "../../../utils/Colors.tsx";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Icon } from "react-native-vector-icons/Icon";

type ThemeState = {
  theme: Theme,
  iconTheme: Icon
}


const initialState:ThemeState = {
  theme: "light"
} as ThemeState;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction) {
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  }
});

export const { changeTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
