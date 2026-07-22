import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const HomeScreenSkeleton = () => {
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.8,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
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
      {/* Category Chips Skeleton */}
      <View style={styles.chipsRow}>
        {[1, 2, 3, 4].map(key => (
          <Animated.View
            key={key}
            style={[styles.chipSkeleton, { opacity: opacityAnim }]}
          />
        ))}
      </View>

      {/* Banner Skeleton */}
      <View style={styles.bannerContainer}>
        <Animated.View style={[styles.bannerSkeleton, { opacity: opacityAnim }]} />
      </View>

      {/* Featured Section Skeleton */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderSkeleton}>
          <Animated.View style={[styles.titleSkeleton, { opacity: opacityAnim }]} />
          <Animated.View style={[styles.seeAllSkeleton, { opacity: opacityAnim }]} />
        </View>

        <View style={styles.horizontalRow}>
          {[1, 2].map(key => (
            <View key={key} style={styles.featuredCardSkeleton}>
              <Animated.View style={[styles.cardImgSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.lineLong, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.lineShort, { opacity: opacityAnim }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Top Cities Skeleton */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderSkeleton}>
          <Animated.View style={[styles.titleSkeleton, { width: 140, opacity: opacityAnim }]} />
        </View>

        <View style={styles.horizontalRow}>
          {[1, 2, 3, 4].map(key => (
            <View key={key} style={styles.citySkeletonWrapper}>
              <Animated.View style={[styles.circleSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.cityTextSkeleton, { opacity: opacityAnim }]} />
            </View>
          ))}
        </View>
      </View>

      {/* Recommended Section Skeleton */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderSkeleton}>
          <Animated.View style={[styles.titleSkeleton, { width: 180, opacity: opacityAnim }]} />
        </View>

        {[1, 2].map(key => (
          <View key={key} style={styles.recommendedCardSkeleton}>
            <Animated.View style={[styles.recImgSkeleton, { opacity: opacityAnim }]} />
            <View style={styles.recTextWrapper}>
              <Animated.View style={[styles.lineLong, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.lineShort, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.linePrice, { opacity: opacityAnim }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  chipSkeleton: {
    width: 80,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 10,
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  bannerSkeleton: {
    width: '100%',
    height: 140,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeaderSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  titleSkeleton: {
    width: 160,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  seeAllSkeleton: {
    width: 50,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  horizontalRow: {
    flexDirection: 'row',
    paddingLeft: 16,
  },
  featuredCardSkeleton: {
    width: width * 0.72,
    height: 200,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardImgSkeleton: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    marginBottom: 10,
  },
  lineLong: {
    width: '80%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginBottom: 8,
  },
  lineShort: {
    width: '50%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  linePrice: {
    width: '40%',
    height: 14,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginTop: 8,
  },
  citySkeletonWrapper: {
    alignItems: 'center',
    marginRight: 16,
  },
  circleSkeleton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    marginBottom: 6,
  },
  cityTextSkeleton: {
    width: 44,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
  },
  recommendedCardSkeleton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  recImgSkeleton: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
  },
  recTextWrapper: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
});

export default HomeScreenSkeleton;
