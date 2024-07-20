import { NavigatorScreenParams } from "@react-navigation/native";
import { FileType } from "../component/File.tsx";

export  type RootStackParamList = {
  MainScreen: NavigatorScreenParams<MainScreenStackParamList>;
};

export type MainScreenStackParamList = {
  HomeScreen: undefined;
  FolderScreen: FileType[];
};
