import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { MainScreenStackParamList } from "../types/stack.type.ts";

export const useMainScreenNavigation = () => {
  return useNavigation<NavigationProp<MainScreenStackParamList>>()
}
