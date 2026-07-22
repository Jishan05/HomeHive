import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const MessageScreenSkeleton = () => {
  const opacityAnim = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.35,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacityAnim]);

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map(key => (
        <View key={key} style={styles.chatCardSkeleton}>
          {/* 60px Circle Avatar */}
          <Animated.View style={[styles.avatarSkeleton, { opacity: opacityAnim }]} />

          {/* Chat Info */}
          <View style={styles.chatInfoSkeleton}>
            <View style={styles.chatHeaderSkeleton}>
              <Animated.View style={[styles.nameSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.timeSkeleton, { opacity: opacityAnim }]} />
            </View>

            {/* Property Chip Pill */}
            <Animated.View style={[styles.propertyChipSkeleton, { opacity: opacityAnim }]} />

            {/* Message Line */}
            <Animated.View style={[styles.messageSkeleton, { opacity: opacityAnim }]} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  chatCardSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarSkeleton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E2E8F0',
  },
  chatInfoSkeleton: {
    flex: 1,
    marginLeft: 16,
  },
  chatHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nameSkeleton: {
    width: 120,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  timeSkeleton: {
    width: 44,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  propertyChipSkeleton: {
    width: 110,
    height: 18,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginBottom: 8,
  },
  messageSkeleton: {
    width: '85%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
});

export default MessageScreenSkeleton;
