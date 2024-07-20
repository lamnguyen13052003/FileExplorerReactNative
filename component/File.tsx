import { Text, TouchableOpacity } from "react-native";
import Row from "../utils/Row.tsx";
import bootstrapColors from "../utils/Colors.tsx";
import { Icon } from "react-native-elements";
import React from "react";
import { useMainScreenNavigation } from "../utils/useMainScreenNavigation.ts";
import { useRoute } from "@react-navigation/native";
import { FolderScreenRouteProp } from "../types/route.type.ts";

export type FileType = {
  name: string;
  path: string;
  isFile: () => boolean;
  isDirectory: () => boolean;
  size: number;
}

export function File({ data, fontSize }: { data: FileType, fontSize?: number }) {
  const route = useRoute<FolderScreenRouteProp>();
  const stackFolder = route.params;
  const navigation = useMainScreenNavigation();
  const defaultFontSize = 18;

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("FolderScreen", !stackFolder ? [data] : [...stackFolder, data]);
    }}>
      <Row style={{
        padding: 10,
        backgroundColor: bootstrapColors.secondary.setOpacity(0.3).getColor(),
        marginVertical: 5,
        borderRadius: 10,
        gap: 10,
        alignItems: "center"
      }}>
        <Icon name={"folder"}
              size={(fontSize ?? defaultFontSize) + 10}
              color={bootstrapColors.primary.getColor()}
        />
        <Text style={{
          color: bootstrapColors.dark.getColor(),
          fontSize: fontSize ?? defaultFontSize,
          fontWeight: "400"
        }}>{data.name}</Text>
      </Row>
    </TouchableOpacity>
  );
}
