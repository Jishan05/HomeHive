import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ScheduledToursSkeleton = () => {
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
      {[1, 2, 3].map(key => (
        <View key={key} style={styles.cardSkeleton}>
          {/* Date Strip Skeleton */}
          <Animated.View style={[styles.dateStripSkeleton, { opacity: opacityAnim }]} />

          {/* Property Row Skeleton */}
          <View style={styles.propertyRowSkeleton}>
            <Animated.View style={[styles.imageSkeleton, { opacity: opacityAnim }]} />
            <View style={styles.propertyInfoSkeleton}>
              <Animated.View style={[styles.titleSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.locationSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.priceSkeleton, { opacity: opacityAnim }]} />
            </View>
          </View>

          {/* Agent Footer Skeleton */}
          <View style={styles.footerSkeleton}>
            <View style={styles.agentInfoSkeleton}>
              <Animated.View style={[styles.avatarSkeleton, { opacity: opacityAnim }]} />
              <View>
                <Animated.View style={[styles.lineSmall, { opacity: opacityAnim }]} />
                <Animated.View style={[styles.lineMedium, { opacity: opacityAnim }]} />
              </View>
            </View>
            <Animated.View style={[styles.btnSkeleton, { opacity: opacityAnim }]} />
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
    paddingTop: 16,
  },
  cardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  dateStripSkeleton: {
    height: 32,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    marginBottom: 12,
  },
  propertyRowSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageSkeleton: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  propertyInfoSkeleton: {
    flex: 1,
    marginLeft: 12,
  },
  titleSkeleton: {
    width: '80%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginBottom: 6,
  },
  locationSkeleton: {
    width: '60%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginBottom: 8,
  },
  priceSkeleton: {
    width: 90,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  footerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  agentInfoSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarSkeleton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    marginRight: 8,
  },
  lineSmall: {
    width: 60,
    height: 10,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
    marginBottom: 4,
  },
  lineMedium: {
    width: 90,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  btnSkeleton: {
    width: 70,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
});

export default ScheduledToursSkeleton;
