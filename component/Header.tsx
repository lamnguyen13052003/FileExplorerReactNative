import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from "react-native-elements";
import { primary, secondary } from "../utils/Colors.tsx";

export function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: primary,
        alignItems: "center",
        padding: 15
      }}
    >
      <View style={{
        flexDirection: "column"
      }}>
        <Text style={{
          fontSize: 25,
          color: "white",
          fontWeight: "bold"
        }}>
          Fiotters
        </Text>
        <Text style={{
          fontSize: 15,
          color: "white"
        }}>
          Team folder
        </Text>
      </View>
      <View style={{
        flexDirection: "row",
        gap: 5
      }}>
        <IconButton
          styles={{
            backgroundColor: secondary
          }}
          icon={
            <Icon
              name="search"
              color={"white"}
            />
          }
        />
        <IconButton
          styles={{
            backgroundColor: secondary,
          }}
          icon={
            <Icon
              name="notifications"
              color={"white"}
            />
          }
        />
      </View>
    </View>
  );
}

const IconButton = ({ icon, onPress, styles }: {
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
          backgroundColor: "#7c7b7b",
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
    backgroundColor: "white",
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

export default Header;
