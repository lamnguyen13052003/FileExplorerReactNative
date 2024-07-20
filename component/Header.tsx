import React, { useEffect, useState } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon } from "react-native-elements";
import bootstrapColors from "../utils/Colors.tsx";
import { RootState } from "../hooks/redux/store.config.ts";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../hooks/redux/slice/theme.slice.ts";

export function Header() {
  const theme = useSelector((state: RootState) => state.themeRedux.theme);
  const [items, setItems] = useState<"light-mode" | "dark-mode">("light-mode");
  const dispatch = useDispatch();

  useEffect(() => {
    setItems(theme === "light" ? "light-mode" : "dark-mode");
  }, [theme]);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: bootstrapColors.primary.getColor(),
        alignItems: "center",
        padding: 15
      }}
    >
      <View style={{
        flexDirection: "column"
      }}>
        <Text style={{
          fontSize: 25,
          color: bootstrapColors.light.getColor(),
          fontWeight: "bold"
        }}>
          Fiotters
        </Text>
        <Text style={{
          fontSize: 15,
          color: bootstrapColors.light.getColor()
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
            backgroundColor: bootstrapColors.dark.setOpacity(0.3).getColor()
          }}
          icon={
            <Icon
              name={items}
              color={bootstrapColors.light.getColor()}
            />
          }

          onPress={() => {
            dispatch(changeTheme());
          }}
        />

        <IconButton
          styles={{
            backgroundColor: bootstrapColors.dark.setOpacity(0.3).getColor()
          }}
          icon={
            <Icon
              name="search"
              color={bootstrapColors.light.getColor()}
            />
          }
        />
        <IconButton
          styles={{
            backgroundColor: bootstrapColors.dark.setOpacity(0.3).getColor()
          }}
          icon={
            <Icon
              name="notifications"
              color={bootstrapColors.light.getColor()}
            />
          }
          onPress={() => {
          }}
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

export default Header;
