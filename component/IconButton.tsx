import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import bootstrapColors from "../utils/Colors.tsx";

export  const IconButton = ({ icon, onPress, styles }: {
  icon: React.ReactNode,
  styles?: StyleProp<ViewStyle>,
  onPress?: () => void
}) => {
  const [width, setWidth] = React.useState(0);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
    >
      <View
        style={[{
          backgroundColor: bootstrapColors.dark.setOpacity(0.1).getColor(),
          padding: 10,
          borderRadius: 10,
          height: width,
          justifyContent: "center",
          alignItems: "center"
        }, styles && styles]}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setWidth(width);
        }}
      >
        {icon}
      </View>
    </TouchableOpacity>
  );
};
export const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    flex: 1,
    backgroundColor: bootstrapColors.light.getColor(),
    justifyContent: "center",
    alignItems: "center"
  },
  textCircle: {
    color: "black",
    fontSize: 30
  },
  menuItemActive: {
    backgroundColor: "red",
    bottom: 50
  }
});
