import React, { useEffect } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { light } from "../utils/Colors.tsx";
import StorageStatusBar, { StorageStatusBarProps } from "../component/StorageStatusBar.tsx";

function Home({ style }: { style?: StyleProp<ViewStyle> }) {
  const [storageStatusBar, setStorageStatusBar] = React.useState<StorageStatusBarProps>({
    total: 20,
    documents: 2,
    musics: 2,
    others: 2,
    images: 2,
    videos: 2
  });

  useEffect(() => {
   setTimeout(() => {
      setStorageStatusBar({
        total: 64,
        documents: 10,
        musics: 5,
        others: 20,
        images: 0.3,
        videos: 7
      });
    }, 2000);

  })

  return (
    <View style={[{
      height: "100%",
      backgroundColor: light
    }, style]}>
      <StorageStatusBar {...storageStatusBar} />
    </View>
  );
}

export default Home;
