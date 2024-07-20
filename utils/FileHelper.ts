import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";
import { FileType } from "../component/File.tsx";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      ]
    );

    if (
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED
    ) {
    } else {
      throw new Error("Storage permission denied");
    }
  } catch (err) {
    throw err;
  }
};

const getFolderSize = async (path: string) => {
  return requestCameraPermission().then(async () => {
    try {
      return await getFolderSizeHelper(path);
    } catch (err) {
      throw err;
    }
  });
};

const getFolderSizeHelper = async (path: string) => {
  let totalSize = 0;

  const files = await RNFS.readDir(path);

  for (const file of files) {
    if (file.isFile()) {
      totalSize += file.size;
    } else if (file.isDirectory()) {
      totalSize += await getFolderSizeHelper(file.path);
    }
  }

  return totalSize;
};

const getFiles = async (path?: string) => {
  return requestCameraPermission().then(async () => {
    if (!path) {
      if (Platform.OS === "android") {
        path = RNFS.ExternalStorageDirectoryPath;
      } else if (Platform.OS === "ios") {
        path = RNFS.DocumentDirectoryPath;
      } else {
        path = "";
      }
    }

    try {
      const files = await RNFS.readDir(path);
      return files.map(dir => {
        return {
          name: dir.name,
          path: dir.path,
          size: dir.size,
          isFile: dir.isFile,
          isDirectory: dir.isDirectory
        } as FileType;
      });
    } catch (err) {
      throw err;
    }
  });
};

export { getFiles, getFolderSize };
