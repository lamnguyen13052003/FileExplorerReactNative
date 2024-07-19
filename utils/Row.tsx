import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

function Row({ children, style }: { children: React.ReactNode, style?: StyleProp<ViewStyle> }) {

  return (
    <View style={[{
      flexDirection: "row"
    }, style]}>
      {children}
    </View>
  );
}

export default Row;
