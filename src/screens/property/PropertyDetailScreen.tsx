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

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
];

const AMENITIES = [
  { id: '1', name: 'Swimming Pool', icon: 'water-outline' },
  { id: '2', name: 'Fitness Gym', icon: 'barbell-outline' },
  { id: '3', name: 'Free WiFi', icon: 'wifi-outline' },
  { id: '4', name: '24/7 Security', icon: 'shield-checkmark-outline' },
  { id: '5', name: 'Car Parking', icon: 'car-outline' },
  { id: '6', name: 'Private Garden', icon: 'leaf-outline' },
  { id: '7', name: 'Central AC', icon: 'snow-outline' },
  { id: '8', name: 'Smart Home', icon: 'hardware-chip-outline' },
];

const NEARBY_PLACES = [
  { id: '1', name: 'International School', dist: '1.2 km', icon: 'school-outline' },
  { id: '2', name: 'City Hospital', dist: '2.5 km', icon: 'medical-outline' },
  { id: '3', name: 'Shopping Mall', dist: '0.8 km', icon: 'bag-handle-outline' },
  { id: '4', name: 'Metro Station', dist: '0.5 km', icon: 'subway-outline' },
];

const PropertyDetailScreen = ({ route, navigation }: any) => {
  const { property } = route.params || {};

  const item = property || {
    id: 'f_a1',
    title: 'Classic Haussmann Penthouse',
    location: 'Paris, France',
    price: '€3,400,000',
    beds: 3,
    baths: 3,
    sqft: '2,600',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d00c?q=80&w=1000&auto=format&fit=crop',
    isFavorite: true,
    category: 'Apartment',
  };

  const [activeImage, setActiveImage] = useState(item.image);
  const [isFavorite, setIsFavorite] = useState(item.isFavorite || false);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'location'>('overview');

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this property on HomeHive: ${item.title} - ${item.location} (${item.price})`,
      });
    } catch (error) {
      console.log('Error sharing property:', error);
    }
  };

  const handleChatAgent = () => {
    navigation.navigate('ChatDetail', {
      chat: {
        id: 'chat_' + item.id,
        agentName: 'Lucas Dubois',
        agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
        propertyTitle: item.title,
        propertyImage: item.image,
      },
    });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image Section */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: activeImage }} style={styles.heroImage} />

          {/* Top Bar Actions */}
          <SafeAreaView edges={['top']} style={styles.topBarSafeArea}>
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.circleBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Icon name="arrow-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={styles.rightActions}>
                <TouchableOpacity
                  style={styles.circleBtn}
                  onPress={handleShare}
                  activeOpacity={0.8}
                >
                  <Icon name="share-social-outline" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.circleBtn, { marginLeft: 10 }]}
                  onPress={() => setIsFavorite(!isFavorite)}
                  activeOpacity={0.8}
                >
                  <Icon
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={20}
                    color={isFavorite ? '#FF4D4D' : '#FFFFFF'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>

          {/* Badges Overlay */}
          <View style={styles.badgeRowOverlay}>
            {item.category && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
            )}
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark-circle" size={14} color="#10B981" />
              <Text style={styles.verifiedBadgeText}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Gallery Thumbnails Strip */}
        <View style={styles.galleryStrip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryContent}>
            {[item.image, ...GALLERY_IMAGES].map((imgUrl, idx) => {
              const isSelected = activeImage === imgUrl;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.thumbWrapper, isSelected && styles.thumbWrapperActive]}
                  onPress={() => setActiveImage(imgUrl)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: imgUrl }} style={styles.thumbImage} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Content Body */}
        <View style={styles.contentBody}>

          {/* Title, Rating & Price Card */}
          <View style={styles.mainInfoCard}>
            <View style={styles.ratingPriceRow}>
              <View style={styles.ratingBadge}>
                <Icon name="star" size={13} color="#FBBF24" />
                <Text style={styles.ratingText}>4.9 (128 Reviews)</Text>
              </View>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>

            <Text style={styles.propertyTitle}>{item.title}</Text>

            <View style={styles.locationRow}>
              <Icon name="location" size={16} color={colors.orange} />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>

          {/* Key Specs Card Grid */}
          <View style={styles.specsCard}>
            <View style={styles.specBox}>
              <Icon name="bed-outline" size={22} color={colors.navyBlue} />
              <Text style={styles.specVal}>{item.beds || 3}</Text>
              <Text style={styles.specLbl}>Bedrooms</Text>
            </View>

            <View style={styles.specDivider} />

            <View style={styles.specBox}>
              <Icon name="water-outline" size={22} color={colors.navyBlue} />
              <Text style={styles.specVal}>{item.baths || 2}</Text>
              <Text style={styles.specLbl}>Bathrooms</Text>
            </View>

            <View style={styles.specDivider} />

            <View style={styles.specBox}>
              <Icon name="expand-outline" size={22} color={colors.navyBlue} />
              <Text style={styles.specVal}>{item.sqft || '2,400'}</Text>
              <Text style={styles.specLbl}>Sq Feet</Text>
            </View>
          </View>

          {/* Section Navigation Tabs */}
          <View style={styles.tabNavContainer}>
            {(['overview', 'amenities', 'location'] as const).map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab === 'overview' ? 'Overview' : tab === 'amenities' ? 'Amenities' : 'Location'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <View style={styles.tabContentSection}>
              <Text style={styles.sectionTitle}>About Property</Text>
              <Text style={styles.descriptionText}>
                This exquisite property offers an matchless luxury living experience. Designed with high-ceiling spacious interiors, abundance of natural sunlight, state-of-the-art kitchen equipment, and premium architectural finishes in a peaceful prime location.
              </Text>

              {/* Highlights List */}
              <View style={styles.highlightsContainer}>
                <View style={styles.highlightItem}>
                  <Icon name="shield-checkmark" size={16} color={colors.orange} />
                  <Text style={styles.highlightText}>100% Legally Verified Property</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Icon name="ribbon" size={16} color={colors.orange} />
                  <Text style={styles.highlightText}>0% Brokerage Charges</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Icon name="key" size={16} color={colors.orange} />
                  <Text style={styles.highlightText}>Ready to Move In</Text>
                </View>
              </View>
            </View>
          )}

          {/* Tab 2: Amenities */}
          {activeTab === 'amenities' && (
            <View style={styles.tabContentSection}>
              <Text style={styles.sectionTitle}>Property Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {AMENITIES.map(amenity => (
                  <View key={amenity.id} style={styles.amenityChip}>
                    <Icon name={amenity.icon} size={18} color={colors.orange} />
                    <Text style={styles.amenityText}>{amenity.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Tab 3: Location & Nearby */}
          {activeTab === 'location' && (
            <View style={styles.tabContentSection}>
              <Text style={styles.sectionTitle}>Location & Nearby</Text>
              <View style={styles.nearbyList}>
                {NEARBY_PLACES.map(place => (
                  <View key={place.id} style={styles.nearbyItem}>
                    <View style={styles.nearbyIconBg}>
                      <Icon name={place.icon} size={18} color={colors.navyBlue} />
                    </View>
                    <View style={styles.nearbyTextWrapper}>
                      <Text style={styles.nearbyName}>{place.name}</Text>
                      <Text style={styles.nearbyDist}>{place.dist} away</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Listing Agent Contact Card */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Listing Agent</Text>
            <View style={styles.agentCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' }}
                style={styles.agentAvatar}
              />
              <View style={styles.agentInfo}>
                <View style={styles.agentNameRow}>
                  <Text style={styles.agentName}>Lucas Dubois</Text>
                  <Icon name="checkmark-circle" size={16} color="#10B981" style={{ marginLeft: 4 }} />
                </View>
                <Text style={styles.agentRole}>Senior Property Specialist</Text>
                <View style={styles.agentRatingRow}>
                  <Icon name="star" size={12} color="#FBBF24" />
                  <Text style={styles.agentRatingText}>4.9 (45 Deals Closed)</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.chatIconBtn}
                onPress={handleChatAgent}
                activeOpacity={0.8}
              >
                <Icon name="chatbubble-ellipses" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
        <View style={styles.bottomBar}>
          <View style={styles.bottomPriceContainer}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.bottomPriceText}>{item.price}</Text>
          </View>

          <View style={styles.bottomActionButtons}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={handleChatAgent}
              activeOpacity={0.8}
            >
              <Icon name="chatbubble-outline" size={18} color={colors.navyBlue} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bookBtn}
              onPress={handleChatAgent}
              activeOpacity={0.85}
            >
              <Icon name="calendar" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.bookBtnText}>Book Tour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 110,
  },
  heroContainer: {
    height: 330,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  topBarSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(11, 30, 54, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActions: {
    flexDirection: 'row',
  },
  badgeRowOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: 'rgba(11, 30, 54, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  verifiedBadgeText: {
    color: colors.navyBlue,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  galleryStrip: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  galleryContent: {
    paddingHorizontal: 16,
  },
  thumbWrapper: {
    width: 70,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbWrapperActive: {
    borderColor: colors.orange,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  contentBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mainInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  priceText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.orange,
  },
  propertyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.navyBlue,
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
  specsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  specBox: {
    alignItems: 'center',
    flex: 1,
  },
  specVal: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navyBlue,
    marginTop: 6,
  },
  specLbl: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  specDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#F1F5F9',
  },
  tabNavContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: colors.navyBlue,
    fontWeight: '700',
  },
  tabContentSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navyBlue,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  descriptionText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 14,
  },
  highlightsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navyBlue,
    marginLeft: 8,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    margin: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    width: (width - 76) / 2,
  },
  amenityText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navyBlue,
    marginLeft: 8,
  },
  nearbyList: {
    marginTop: 4,
  },
  nearbyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  nearbyIconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nearbyTextWrapper: {
    flex: 1,
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  nearbyDist: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  agentAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  agentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentName: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navyBlue,
  },
  agentRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  agentRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  agentRatingText: {
    fontSize: 11,
    color: '#D97706',
    fontWeight: '700',
    marginLeft: 4,
  },
  chatIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  bottomSafeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  bottomPriceContainer: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  bottomPriceText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.orange,
  },
  bottomActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orange,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default PropertyDetailScreen;
