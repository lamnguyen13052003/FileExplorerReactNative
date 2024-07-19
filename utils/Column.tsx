import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

function Column({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[{
      flexDirection: `column`
    }, style]}>
      {children}
    </View>
  );
}

export default Column;
