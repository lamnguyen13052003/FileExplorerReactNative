import React, { useEffect } from "react";
import { FlatList, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import bootstrapColors from "../utils/Colors.tsx";
import StorageStatusBar, { MIN_HEIGHT } from "../component/StorageStatusBar.tsx";
import Row from "../utils/Row.tsx";
import { Icon } from "react-native-elements";
import Column from "../utils/Column.tsx";
import { getRootDirectories } from "../utils/FileHelper.ts";


function Home({ style }: { style?: StyleProp<ViewStyle> }) {
  const [folders, setFolders] = React.useState<string[]>([]);

  useEffect(() => {
    getRootDirectories().then((folders) => {
      setFolders(folders);
    });
  }, []);

  return (
    <Column style={[{
      height: "100%",
      backgroundColor: bootstrapColors.light.getColor()
    }, style]}>
      <StorageStatusBar  />
      <Text style={{
        fontSize: 30,
        color: bootstrapColors.dark.getColor(),
        fontWeight: "bold",
        borderTopWidth: 1,
        borderColor: bootstrapColors.secondary.setOpacity(0.3).getColor(),
        paddingTop: 5,
        marginTop: 30
      }}>Thư mục</Text>
      <ListFolder folders={folders} />
    </Column>
  );
}

function ListFolder({ folders, onScroll }: { folders: string[], onScroll?: (y: number) => void }) {
  return (
    <FlatList data={folders}
              renderItem={({ item }) => {
                return <Folder name={item} />;
              }}
              style={{
                height: "100%"
              }}
              keyExtractor={item => item}
              onScroll={(event) => {
                onScroll && onScroll(event.nativeEvent.contentOffset.y);
              }}
              showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
    />
  );
}

function Folder({ name, fontSize }: { name: string, fontSize?: number }) {
  const defaultFontSize = 18;

  return (
    <TouchableOpacity>
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
        }}>{name}</Text>
      </Row>
    </TouchableOpacity>
  );
}

export default Home;
