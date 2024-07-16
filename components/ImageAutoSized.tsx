import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


export default function ImageAutoSized({ uri, showDownload = false }: any) {
  const [size, setSize] = useState<number[]>([100, 100]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (uri)
      Image.getSize(uri, function (w, h) {
        setSize([w, h]);
      })
  }, []);

  const aspectRatio = size[0] / size[1];

  async function handleDownload() {
    const filename = uri.slice(uri.lastIndexOf('/')); //with file's extension
    const localUri = FileSystem.documentDirectory + filename;

    const downloadResumable = FileSystem.createDownloadResumable(uri, localUri, {}, (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      setDownloadProgress(progress);
    }
    );

    if (status === null) {
      requestPermission();
    }

    try {
      const { uri }: any = await downloadResumable.downloadAsync();
      await MediaLibrary.saveToLibraryAsync(uri);

      if (uri) {
        Alert.alert("Téléchargement terminé", "L'image est enregistré sur votre mobile !")
      }

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <ImageBackground style={{ aspectRatio: aspectRatio }} source={{ uri: uri }} >
      {
        showDownload &&
        <TouchableOpacity style={s.downloadBtn} onPress={handleDownload}>
          <Ionicons name='download-outline' size={35} color={'white'} />
        </TouchableOpacity>
      }
    </ImageBackground>
  )
}


const s = StyleSheet.create({
  downloadBtn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.rose,
    borderRadius: 5,
    margin: 10,
    padding: 4,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  }
})
