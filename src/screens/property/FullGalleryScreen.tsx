import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');

const FullGalleryScreen = ({ route, navigation }: any) => {
  const { images = [], initialIndex = 0, title = 'Property Gallery' } = route.params || {};

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomScale, setZoomScale] = useState(1);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this property gallery: ${title}`,
      });
    } catch (error) {
      console.log('Error sharing gallery:', error);
    }
  };

  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const toggleDoubleTapZoom = () => {
    setZoomScale(prev => (prev > 1 ? 1 : 2.5));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle={'light-content'} backgroundColor="#000000" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Icon name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.counterText}>{currentIndex + 1} / {images.length}</Text>
        </View>

        <TouchableOpacity
          style={styles.circleBtn}
          onPress={handleShare}
          activeOpacity={0.8}
        >
          <Icon name="share-social-outline" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>



      {/* Fullscreen Horizontal Paging Image View */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIdx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIdx);
          setZoomScale(1);
        }}
        contentOffset={{ x: currentIndex * width, y: 0 }}
        style={styles.mainScrollView}
      >
        {images.map((imgUrl: string, index: number) => (
          <View key={index} style={styles.imageSlideWrapper}>
            <ScrollView
              maximumZoomScale={4.0}
              minimumZoomScale={1.0}
              zoomScale={zoomScale}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              centerContent
              contentContainerStyle={styles.zoomScrollContent}
              style={{ width: width, height: '100%' }}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={toggleDoubleTapZoom}
                style={styles.imageTouchable}
              >
                <Image
                  source={{ uri: imgUrl }}
                  style={[
                    styles.fullImage,
                    { transform: [{ scale: zoomScale }] },
                  ]}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Thumbnail Strip */}
      <View style={styles.footerContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbListContent}
        >
          {images.map((imgUrl: string, index: number) => {
            const isSelected = currentIndex === index;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.thumbWrapper,
                  isSelected && styles.thumbWrapperActive,
                ]}
                onPress={() => {
                  setCurrentIndex(index);
                  setZoomScale(1);
                }}
                activeOpacity={0.8}
              >
                <Image source={{ uri: imgUrl }} style={styles.thumbImage} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(11, 30, 54, 0.95)',
    borderBottomWidth: 0.3,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  counterText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  floatingZoomControls: {
    position: 'absolute',
    right: 16,
    top: 80,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 30, 54, 0.85)',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 4,
    zIndex: 30,
    borderWidth: 0.3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  zoomBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  zoomResetBadge: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    marginVertical: 2,
  },
  zoomResetText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  mainScrollView: {
    flex: 1,
  },
  imageSlideWrapper: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTouchable: {
    width: width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: '100%',
  },
  footerContainer: {
    paddingVertical: 12,
    backgroundColor: 'rgba(11, 30, 54, 0.95)',
    borderTopWidth: 0.3,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  thumbListContent: {
    paddingHorizontal: 16,
  },
  thumbWrapper: {
    width: 60,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    opacity: 0.5,
  },
  thumbWrapperActive: {
    borderColor: colors.orange,
    opacity: 1,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
});

export default FullGalleryScreen;
