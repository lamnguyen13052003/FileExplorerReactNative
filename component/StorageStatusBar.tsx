import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import bootstrapColors, { Color } from "../utils/Colors.tsx";
import Column from "../utils/Column.tsx";
import Row from "../utils/Row.tsx";

export type StorageStatusBarProps = {
  total: number,
  documents: number,
  musics: number,
  images: number,
  videos: number,
  others: number,
}


function StorageStatusBar({ total, documents, musics, videos, others, images }: StorageStatusBarProps) {
  const storageStatusBarHeight = 300;

  const dropAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(dropAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
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
          }}>{documents + videos + images + musics + others}/{total} GB</Text>
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
          <SymbolSessionStorage title="Free" color={bootstrapColors.secondary.setOpacity(0.3)} />
          <SymbolSessionStorage title="Others" color={bootstrapColors.secondary} />
          <SymbolSessionStorage title="Videos" color={bootstrapColors.warning} />
          <SymbolSessionStorage title="Musics" color={bootstrapColors.danger} />
          <SymbolSessionStorage title="Images" color={bootstrapColors.info} />
          <SymbolSessionStorage title="Documents" color={bootstrapColors.success} />
        </Column>
        <Column style={{
          height: storageStatusBarHeight,
          width: 50,
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
            <SessionStorage totalHeight={storageStatusBarHeight} capacity={others} total={total} color={bootstrapColors.secondary} />
            <SessionStorage totalHeight={storageStatusBarHeight} capacity={videos} total={total} color={bootstrapColors.warning} />
            <SessionStorage totalHeight={storageStatusBarHeight} capacity={musics} total={total} color={bootstrapColors.danger} />
            <SessionStorage totalHeight={storageStatusBarHeight} capacity={images} total={total} color={bootstrapColors.info} />
            <SessionStorage totalHeight={storageStatusBarHeight} capacity={documents} total={total} color={bootstrapColors.success} />
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
    Animated.timing(growAnim, {
      toValue: (capacity / total) * totalHeight,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }, [capacity]);

  return (
    <Animated.View style={{
      width: 50,
      backgroundColor: color.getColor(),
      height: growAnim
    }} />
  );
}

function SymbolSessionStorage({ title, color }: {
  title: string,
  color: Color
}) {
  return (
    <Row style={{
      gap: 10,
      alignItems: "center"
    }}>
      <View style={{
        width: 25,
        height: 25,
        backgroundColor: color.getColor(),
        borderColor: bootstrapColors.dark.getColor(),
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5
      }} />
      <Text style={{
        color: bootstrapColors.dark.getColor(),
        fontSize: 15
      }}>{title}</Text>
    </Row>
  );
}


export default StorageStatusBar;
