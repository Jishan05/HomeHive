import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const ExploreScreenSkeleton = () => {
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
      {/* Property Card Skeletons matching exact card dimensions */}
      {[1, 2].map(key => (
        <View key={key} style={styles.cardSkeleton}>
          {/* 180px Image Box */}
          <Animated.View style={[styles.imageSkeleton, { opacity: opacityAnim }]} />

          {/* Card Content Wrapper */}
          <View style={styles.cardContentSkeleton}>
            {/* Price & Rating Row */}
            <View style={styles.priceRowSkeleton}>
              <Animated.View style={[styles.priceSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.ratingSkeleton, { opacity: opacityAnim }]} />
            </View>

            {/* Property Title Placeholder */}
            <Animated.View style={[styles.titleSkeleton, { opacity: opacityAnim }]} />

            {/* Location Row Placeholder */}
            <Animated.View style={[styles.locationSkeleton, { opacity: opacityAnim }]} />

            {/* Divider Line */}
            <View style={styles.dividerSkeleton} />

            {/* Specs Row Placeholder */}
            <View style={styles.specsRowSkeleton}>
              <Animated.View style={[styles.specItemSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.specItemSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.specItemSkeleton, { opacity: opacityAnim }]} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
  },
  cardSkeleton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageSkeleton: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  cardContentSkeleton: {
    padding: 16,
  },
  priceRowSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceSkeleton: {
    width: 110,
    height: 22,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  ratingSkeleton: {
    width: 48,
    height: 20,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  titleSkeleton: {
    width: '85%',
    height: 18,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    marginBottom: 8,
  },
  locationSkeleton: {
    width: '60%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginBottom: 14,
  },
  dividerSkeleton: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  specsRowSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specItemSkeleton: {
    width: 70,
    height: 16,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
});

export default ExploreScreenSkeleton;
