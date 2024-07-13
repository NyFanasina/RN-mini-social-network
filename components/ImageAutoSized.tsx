import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function ImageAutoSized({ uri }: any) {
  const [size, setSize] = useState<number[]>([100, 100])

  useEffect(() => {
    Image.getSize(uri, function (w, h) {
      if (h > 600)
        return setSize([w, 600]);
      return setSize([w, h]);
    })
  }, [])

  return <Image style={{ height: size[1] }} source={{ uri: uri }} />

}
