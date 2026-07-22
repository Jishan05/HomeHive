import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const MyPropertiesSkeleton = () => {
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
          <View style={styles.cardHeaderRow}>
            {/* 100x100 Thumbnail Image */}
            <Animated.View style={[styles.imageSkeleton, { opacity: opacityAnim }]} />

            <View style={styles.cardInfoSkeleton}>
              <View style={styles.statusRowSkeleton}>
                <Animated.View style={[styles.statusBadgeSkeleton, { opacity: opacityAnim }]} />
                <Animated.View style={[styles.dateSkeleton, { opacity: opacityAnim }]} />
              </View>

              <Animated.View style={[styles.titleSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.locationSkeleton, { opacity: opacityAnim }]} />
              <Animated.View style={[styles.priceSkeleton, { opacity: opacityAnim }]} />
            </View>
          </View>

          {/* Metrics & Actions Footer */}
          <View style={styles.footerSkeleton}>
            <Animated.View style={[styles.metricSkeleton, { opacity: opacityAnim }]} />
            <Animated.View style={[styles.actionBtnSkeleton, { opacity: opacityAnim }]} />
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
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeaderRow: {
    flexDirection: 'row',
  },
  imageSkeleton: {
    width: 100,
    height: 100,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  cardInfoSkeleton: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  statusRowSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadgeSkeleton: {
    width: 60,
    height: 18,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
  },
  dateSkeleton: {
    width: 70,
    height: 12,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  titleSkeleton: {
    width: '85%',
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  locationSkeleton: {
    width: '60%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  priceSkeleton: {
    width: 80,
    height: 16,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  footerSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 12,
    paddingTop: 10,
  },
  metricSkeleton: {
    width: 140,
    height: 14,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
  },
  actionBtnSkeleton: {
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },
});

export default MyPropertiesSkeleton;
