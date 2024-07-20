import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import bootstrapColors, { Color } from "../utils/Colors.tsx";
import Column from "../utils/Column.tsx";
import Row from "../utils/Row.tsx";
import formatterCapacity, { CapacityUnit } from "../utils/FormatterCapacity.ts";
import RNFS from "react-native-fs";
import DeviceInfo from "react-native-device-info";
import { getFolderSize } from "../utils/FileHelper.ts";

const MIN_HEIGHT = 300;
const MIN_WIDTH = 100;

function StorageStatusBar({
                            height,
                            width
                          }: {
  height?: number,
  width?: number
}) {

  const storageBarHeight = !height ? MIN_HEIGHT : Math.max(height, MIN_HEIGHT);
  const storageBarWidth = !width ? MIN_WIDTH : width;
  const dropAnim = useRef(new Animated.Value(-storageBarHeight)).current;
  const [total, setTotal] = React.useState<number>(64);
  const [freeStorage, setFreeStorage] = React.useState<number>(64);
  const [storageStatusBar, setStorageStatusBar] = React.useState<{
    documents: number,
    musics: number,
    others: number
    images: number,
    videos: number,
  }>({
    documents: 2,
    musics: 2,
    others: 2,
    images: 2,
    videos: 2
  });

  const getTotalMemory = async () => {
    DeviceInfo.getTotalDiskCapacity().then(total => {
      setTotal(total);
    });
    DeviceInfo.getFreeDiskStorage().then(freeStorage => {
      setFreeStorage(freeStorage);
    });
  };

  const loadCapacities = () => {
    const documentsPromise = getFolderSize(RNFS.DocumentDirectoryPath);
    const musicsPromise = getFolderSize(RNFS.DownloadDirectoryPath);
    const imagesPromise = getFolderSize(RNFS.PicturesDirectoryPath);
    const videosPromise = getFolderSize(RNFS.PicturesDirectoryPath);
    const othersPromise = getFolderSize(RNFS.ExternalDirectoryPath);

    documentsPromise.then(size => {
      setStorageStatusBar(prev => ({
        ...prev,
        documents: size
      }));
    });
    musicsPromise.then(size => {
      setStorageStatusBar(prev => ({
        ...prev,
        musics: size
      }));
    });
    imagesPromise.then(size => {
      setStorageStatusBar(prev => ({
        ...prev,
        images: size
      }));
    });
    videosPromise.then(size => {
      setStorageStatusBar(prev => ({
        ...prev,
        videos: size
      }));
    });
    othersPromise.then(size => {
      setStorageStatusBar(prev => ({
        ...prev,
        others: size
      }));
    });
  };

  useEffect(() => {
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start(result => {
      getTotalMemory().then(() => {
        loadCapacities();
      });
    });
  }, []);

  return (
    <Column
      style={{
        gap: 20
      }}>
      <Row style={{
        justifyContent: "space-between"
      }}>
        <Row style={{
          alignItems: "flex-end"
        }}>
          <Text style={{
            color: bootstrapColors.dark.getColor(),
            fontWeight: "bold",
            fontSize: 20
          }}>Storage </Text>
          <Text style={{
            color: bootstrapColors.dark.getColor(),
            fontSize: 15
          }}>{formatterCapacity(CapacityUnit.GB, total - freeStorage, 2)}/{formatterCapacity(CapacityUnit.GB, total, 2)}GB</Text>
        </Row>
        <TouchableOpacity>
          <Text style={{
            color: bootstrapColors.primary.getColor(),
            fontWeight: "bold",
            fontSize: 20
          }}>updates</Text>
        </TouchableOpacity>
      </Row>

      <Row style={{
        justifyContent: "space-between",
        paddingHorizontal: 20
      }}>
        <Column style={{
          justifyContent: "space-around",
          paddingVertical: 20
        }}>
          <SymbolSessionStorage title="Free" capacity={freeStorage} color={bootstrapColors.secondary.setOpacity(0.3)} />
          <SymbolSessionStorage title="Others" capacity={storageStatusBar.others} color={bootstrapColors.secondary} />
          <SymbolSessionStorage title="Videos" capacity={storageStatusBar.videos} color={bootstrapColors.warning} />
          <SymbolSessionStorage title="Musics" capacity={storageStatusBar.musics} color={bootstrapColors.danger} />
          <SymbolSessionStorage title="Images" capacity={storageStatusBar.images} color={bootstrapColors.info} />
          <SymbolSessionStorage title="Documents" capacity={storageStatusBar.documents}
                                color={bootstrapColors.success} />
        </Column>
        <Column style={{
          height: storageBarHeight,
          width: storageBarWidth,
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: bootstrapColors.secondary.setOpacity(0.3).getColor()
        }}>
          <Animated.View
            style={{
              height: "100%",
              justifyContent: "flex-end",
              flexDirection: "column",
              top: dropAnim
            }}>
            <SessionStorage totalHeight={storageBarHeight} capacity={storageStatusBar.others} total={total}
                            color={bootstrapColors.secondary} />
            <SessionStorage totalHeight={storageBarHeight} capacity={storageStatusBar.videos} total={total}
                            color={bootstrapColors.warning} />
            <SessionStorage totalHeight={storageBarHeight} capacity={storageStatusBar.musics} total={total}
                            color={bootstrapColors.danger} />
            <SessionStorage totalHeight={storageBarHeight} capacity={storageStatusBar.images} total={total}
                            color={bootstrapColors.info} />
            <SessionStorage totalHeight={storageBarHeight} capacity={storageStatusBar.documents} total={total}
                            color={bootstrapColors.success} />
          </Animated.View>
        </Column>
      </Row>
    </Column>
  );
}


function SessionStorage({ total, capacity, color, totalHeight }: {
  total: number,
  capacity: number,
  color: Color,
  totalHeight: number
}) {
  const growAnim = useRef(new Animated.Value((5 / 100) * total)).current;

  useEffect(() => {
    const height = (capacity / total) * totalHeight;
    Animated.timing(growAnim, {
      toValue: height,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [capacity]);

  return (
    <Animated.View style={{
      width: "100%",
      backgroundColor: color.getColor(),
      height: growAnim
    }} />
  );
}

function SymbolSessionStorage({ title, color, capacity }: {
  title: string,
  color: Color,
  capacity: number
}) {


  return (
    <Row style={{
      gap: 10,
      alignItems: "center"
    }}>
      <View style={{
        width: 40,
        height: 40,
        backgroundColor: color.getColor(),
        borderColor: bootstrapColors.dark.getColor(),
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5
      }} />
      <Column>
        <Text style={{
          color: bootstrapColors.dark.getColor(),
          fontSize: 15
        }}>{title}</Text>
        <Text style={{
          color: bootstrapColors.primary.getColor(),
          fontSize: 15,
          fontWeight: "bold"
        }}>{formatterCapacity(CapacityUnit.GB, capacity, 0) > 0 ?
          formatterCapacity(CapacityUnit.GB, capacity, 2) + "Gb" :
          formatterCapacity(CapacityUnit.MB, capacity, 0) > 0 ?
            formatterCapacity(CapacityUnit.MB, capacity, 2) + "Mb" :
            formatterCapacity(CapacityUnit.KB, capacity, 2) + "Kb"}</Text>
      </Column>
    </Row>
  );
}


export default StorageStatusBar;
export { MIN_HEIGHT, MIN_WIDTH };
