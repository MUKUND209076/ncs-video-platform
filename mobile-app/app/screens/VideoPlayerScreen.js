import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import api from '../services/api'

export default function VideoPlayerScreen({ route }) {
  const { id, token } = route.params
  const [url, setUrl] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/video/${id}/stream?token=${token}`)
      setUrl(res.data.stream_url)
    }
    load()
  }, [])

  if (!url) return <ActivityIndicator style={{ flex: 1 }} />

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' }
})
