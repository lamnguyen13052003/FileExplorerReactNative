import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { FolderScreenRouteProp } from "../types/route.type.ts";
import { useRoute } from "@react-navigation/native";
import { getFiles } from "../utils/FileHelper.ts";
import { FileType } from "../component/File.tsx";
import bootstrapColors from "../utils/Colors.tsx";
import { ListFile } from "../component/ListFile.tsx";
import Column from "../utils/Column.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../hooks/redux/store.config.ts";
import Row from "../utils/Row.tsx";
import { IconButton } from "../component/IconButton.tsx";
import { Icon } from "react-native-elements";
import { useMainScreenNavigation } from "../utils/useMainScreenNavigation.ts";

function FolderScreen() {
  const navigation = useMainScreenNavigation();
  const route = useRoute<FolderScreenRouteProp>();
  const [currentFolder, setCurrentFolder] = useState<FileType | null>(null);
  const stackFolder = route.params;
  const [folders, setFolders] = React.useState<FileType[]>([]);
  const theme = useSelector((state: RootState) => state.themeRedux.theme);
  bootstrapColors.setTheme(theme);

  useEffect(() => {
    if (!stackFolder.length) return;
    setCurrentFolder(stackFolder[stackFolder.length - 1]);
  }, [stackFolder]);

  useEffect(() => {
    if (!currentFolder) return;
    if (currentFolder.isDirectory()) {
      getFiles(currentFolder.path).then((files) => {
        setFolders(files);
      });
    }
  }, [currentFolder]);


  return (
    <Column style={{
      padding: 15,
      backgroundColor: bootstrapColors.light.getColor()
    }}>
      <Row style={{
        marginBottom: 20,
        alignItems: "center"
      }}>
        <IconButton
          icon={
            <Icon
              name={"arrow-back"}
              size={30}
              color={bootstrapColors.primary.getColor()}
            />
          }
          onPress={() => {
            if (stackFolder.length == 1)
              navigation.navigate("HomeScreen");
            else
              navigation.navigate("FolderScreen", stackFolder.slice(0, -1));
          }}
          styles={{
            backgroundColor: bootstrapColors.light.setOpacity(0).getColor()
          }}
        />
        <Text numberOfLines={1} style={{
          color: bootstrapColors.primary.getColor(),
          fontSize: 30,
          fontWeight: "bold"
        }}>{currentFolder ? currentFolder.name : ""}</Text>
      </Row>
      <ListFile folders={folders} />
    </Column>
  );
}

export default FolderScreen;
