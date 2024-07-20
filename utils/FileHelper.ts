import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";

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
      console.log("You can use the storage");
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

const getRootDirectories = async () => {
  return requestCameraPermission().then(async () => {
    let rootPath = "";
    if (Platform.OS === "android") {
      rootPath = RNFS.ExternalStorageDirectoryPath;
    } else if (Platform.OS === "ios") {
      rootPath = RNFS.DocumentDirectoryPath; // Hoặc một đường dẫn khác bạn muốn truy cập trên iOS
    }

    try {
      const files = await RNFS.readDir(rootPath);
      const directories = files.filter(file => file.isDirectory());
      return directories.map(dir => dir.name);
    } catch (err) {
      throw err;
    }
  });
};

export { getRootDirectories, getFolderSize };
