import React, { useEffect, useState } from 'react'
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import api from '../services/api'

export default function DashboardScreen({ navigation }) {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      const response = await api.get('/dashboard')
      setVideos(response.data)
    } catch (error) {
      console.error('Error loading videos:', error)
    }
  }

  const handleVideoPress = (video) => {
    navigation.navigate('VideoPlayer', {
      id: video.id,
      token: video.playback_token
    })
  }

  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => handleVideoPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={24} color="white" />
          </View>
        </View>
        {item.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>FEATURED</Text>
          </View>
        )}
      </View>
      
      <View style={styles.videoInfo}>
        <View style={styles.titleRow}>
          <View style={styles.chipContainer}>
            <View style={styles.ncsChip}>
              <Text style={styles.ncsChipText}>NCS</Text>
            </View>
            {index === 0 && (
              <View style={styles.stableChip}>
                <Ionicons name="shield-checkmark" size={12} color="#10B981" />
                <Text style={styles.stableChipText}>Highly Stable</Text>
              </View>
            )}
          </View>
          <Text style={styles.duration}>3:45</Text>
        </View>
        
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>
          <Ionicons name="musical-notes" size={14} color="#6B7280" />
          {' '}{item.artist || 'Various Artists'}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color="#9CA3AF" />
            <Text style={styles.statText}>{item.views || '1.2M'}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={16} color="#9CA3AF" />
            <Text style={styles.statText}>{item.date || '2 days ago'}</Text>
          </View>
          <View style={[styles.statItem, styles.permissionBadge]}>
            <Ionicons name="checkmark-circle-outline" size={16} color="#10B981" />
            <Text style={styles.permissionText}>Free to use</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  videoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  thumbnailContainer: {
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(79, 70, 229, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  featuredBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featuredText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  videoInfo: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  ncsChip: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ncsChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  stableChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  stableChipText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  duration: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 28,
  },
  artist: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 22,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
  },
  permissionBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  permissionText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
})