import { FlatList } from "react-native";
import React from "react";
import { File, FileType } from "./File.tsx";

export function ListFile({ folders, onScroll }: { folders: FileType[], onScroll?: (y: number) => void }) {
  return (
    <FlatList data={folders}
              renderItem={({ item }) => {
                return <File data={item} />;
              }}
              style={{
                height: "100%"
              }}
              keyExtractor={item => item.name}
              onScroll={(event) => {
                onScroll && onScroll(event.nativeEvent.contentOffset.y);
              }}
              showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
    />
  );
}
