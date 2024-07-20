import React, { useEffect } from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import bootstrapColors from "../utils/Colors.tsx";
import StorageStatusBar from "../component/StorageStatusBar.tsx";
import Column from "../utils/Column.tsx";
import { getFiles } from "../utils/FileHelper.ts";
import { ListFile } from "../component/ListFile.tsx";
import { FileType } from "../component/File.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../hooks/redux/store.config.ts";


function HomeScreen({ style }: { style?: StyleProp<ViewStyle> }) {
  const [folders, setFolders] = React.useState<FileType[]>([]);
  const theme = useSelector((state: RootState) => state.themeRedux.theme);
  bootstrapColors.setTheme(theme);

  useEffect(() => {
    getFiles().then((folders) => {
      setFolders(folders);
    });
  }, []);


  return (
    <Column style={[{
      height: "100%",
      padding: 15,
      backgroundColor: bootstrapColors.light.getColor()
    }, style]}>
      <StorageStatusBar />
      <Text style={{
        fontSize: 30,
        color: bootstrapColors.dark.getColor(),
        fontWeight: "bold",
        borderTopWidth: 1,
        borderColor: bootstrapColors.secondary.setOpacity(0.3).getColor(),
        paddingTop: 5,
        marginTop: 30
      }}>Thư mục</Text>
      <ListFile folders={folders} />
    </Column>
  );
}


export default HomeScreen;
