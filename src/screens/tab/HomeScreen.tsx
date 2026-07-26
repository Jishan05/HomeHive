import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, RefreshControl, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import HomeHeader from '../../components/common/HomeHeader';
import CategoryChips from '../../components/common/CategoryChips';
import BottomSheet from '../../components/common/BottomSheet';
import FeaturedCard from '../../components/common/FeaturedCard';
import RecommendedCard from '../../components/common/RecommendedCard';
import CityCircleCard from '../../components/common/CityCircleCard';
import HomeScreenSkeleton from '../../components/common/HomeScreenSkeleton';
import HomeBudgetWidget from '../../components/common/HomeBudgetWidget';
import QuickMatchSwipeCard from '../../components/common/QuickMatchSwipeCard';
import { useModeStore } from '../../store/useModeStore';
import { featuredProperties, recommendedProperties, topCities } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const MICRO_FILTERS = ['Near Metro / Tram', 'Balcony & Terrace', 'Energy Class A+', 'Furnished'];

const EUROPEAN_CITIES = [
  'London, UK',
  'Paris, France',
  'Berlin, Germany',
  'Madrid, Spain',
  'Rome, Italy',
  'Amsterdam, Netherlands',
  'Vienna, Austria',
  'Prague, Czech Republic',
  'Stockholm, Sweden',
  'Lisbon, Portugal',
  'Dublin, Ireland',
  'Brussels, Belgium'
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const setMode = useModeStore(state => state.setMode);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMicroFilter, setSelectedMicroFilter] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filterBeds, setFilterBeds] = useState<number | null>(null);
  const [filterBaths, setFilterBaths] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterPrice, setFilterPrice] = useState<string | null>(null);
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);

  // Location Selector State
  const [location, setLocation] = useState('London, UK');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8s placeholder skeleton loader
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 800);
  }, []);

  const filteredFeatured = useMemo(() => {
    let list = featuredProperties.filter(p => p.purpose === mode);
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (filterType.length > 0) {
      list = list.filter(p => filterType.includes(p.category));
    }
    if (filterBeds !== null) {
      list = list.filter(p => p.beds >= filterBeds);
    }
    if (filterBaths !== null) {
      list = list.filter(p => p.baths >= filterBaths);
    }
    if (filterPrice !== null) {
      list = list.filter(p => {
        const numPrice = parseInt(p.price.replace(/[^0-9]/g, ''), 10) || 0;
        if (mode === 'Buy') {
          if (filterPrice === 'Under €500k') return numPrice < 500000;
          if (filterPrice === '€500k - €1M') return numPrice >= 500000 && numPrice <= 1000000;
          if (filterPrice === '€1M - €2M') return numPrice > 1000000 && numPrice <= 2000000;
          if (filterPrice === '€2M+') return numPrice > 2000000;
        } else {
          if (filterPrice === 'Under €1k') return numPrice < 1000;
          if (filterPrice === '€1k - €2k') return numPrice >= 1000 && numPrice <= 2000;
          if (filterPrice === '€2k - €5k') return numPrice > 2000 && numPrice <= 5000;
          if (filterPrice === '€5k+') return numPrice > 5000;
        }
        return true;
      });
    }
    return list;
  }, [activeCategory, mode, filterBeds, filterBaths, filterType, filterPrice]);

  const filteredRecommended = useMemo(() => {
    let list = recommendedProperties.filter(p => p.purpose === mode);
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (filterType.length > 0) {
      list = list.filter(p => filterType.includes(p.category));
    }
    if (filterBeds !== null) {
      list = list.filter(p => p.beds >= filterBeds);
    }
    if (filterBaths !== null) {
      list = list.filter(p => p.baths >= filterBaths);
    }
    if (filterPrice !== null) {
      list = list.filter(p => {
        const numPrice = parseInt(p.price.replace(/[^0-9]/g, ''), 10) || 0;
        if (mode === 'Buy') {
          if (filterPrice === 'Under €500k') return numPrice < 500000;
          if (filterPrice === '€500k - €1M') return numPrice >= 500000 && numPrice <= 1000000;
          if (filterPrice === '€1M - €2M') return numPrice > 1000000 && numPrice <= 2000000;
          if (filterPrice === '€2M+') return numPrice > 2000000;
        } else {
          if (filterPrice === 'Under €1k') return numPrice < 1000;
          if (filterPrice === '€1k - €2k') return numPrice >= 1000 && numPrice <= 2000;
          if (filterPrice === '€2k - €5k') return numPrice > 2000 && numPrice <= 5000;
          if (filterPrice === '€5k+') return numPrice > 5000;
        }
        return true;
      });
    }
    return list;
  }, [activeCategory, mode, filterBeds, filterBaths, filterType, filterPrice]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 300 && !showScrollTop) {
      setShowScrollTop(true);
    } else if (offsetY <= 300 && showScrollTop) {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <>
      <FocusAwareStatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.safeArea} edges={['top']} >
        <HomeHeader 
          onFilterPress={() => setFilterVisible(true)} 
          location={location}
          onLocationPress={() => setLocationModalVisible(true)}
        />

        {loading ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.orange]}
                tintColor={colors.orange}
              />
            }
          >
            <HomeScreenSkeleton />
          </ScrollView>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.orange]}
                tintColor={colors.orange}
              />
            }
          >
            {/* Live Price Drop Ticker */}
            <TouchableOpacity
              style={styles.tickerBar}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('PropertyList', { title: 'Price Drops', type: 'featured' })}
            >
              <View style={styles.tickerBadge}>
                <Text style={styles.tickerBadgeText}>LIVE</Text>
              </View>
              <Text style={styles.tickerText} numberOfLines={1}>
                Price Drop Alert: Paris Haussmann Penthouse reduced by €85,000!
              </Text>
              <Icon name="chevron-forward" size={14} color={colors.orange} />
            </TouchableOpacity>

            <CategoryChips
              selectedCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />

            {/* Smart Micro-Filters */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.microFiltersRow}>
              {MICRO_FILTERS.map((filter) => {
                const isSelected = selectedMicroFilter === filter;
                return (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.microFilterChip, isSelected && styles.microFilterChipActive]}
                    onPress={() => setSelectedMicroFilter(isSelected ? null : filter)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.microFilterText, isSelected && styles.microFilterTextActive]}>
                      {filter}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Special Promo Banner */}
            <View style={styles.bannerContainer}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80' }}
                style={styles.bannerImage}
                imageStyle={styles.bannerImageStyle}
              >
                <View style={styles.bannerOverlay}>
                  <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>LIMITED TIME</Text>
                  </View>
                  <Text style={styles.bannerTitle}>0% Brokerage Fee</Text>
                  <Text style={styles.bannerSubtitle}>On selected luxury apartments in Paris & Berlin</Text>

                  <TouchableOpacity
                    style={styles.bannerBtn}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('PropertyList', { title: 'Special Deals', type: 'featured' })}
                  >
                    <Text style={styles.bannerBtnText}>Claim Deal</Text>
                    <Icon name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 6 }} />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>

            {/* Interactive Budget Calculator Widget */}
            <HomeBudgetWidget />

            {/* Featured Section */}
            {filteredFeatured.length > 0 && (
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View>
                    <Text style={styles.sectionTitle}>Featured Properties</Text>
                    <Text style={styles.sectionSubtitle}>Handpicked premium listings</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('PropertyList', { title: 'Featured Properties', type: 'featured' })}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.seeAllText}>See all</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.featuredList}
                >
                  {filteredFeatured.map((property) => (
                    <FeaturedCard key={property.id} property={property} />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Interactive Quick Match Discovery Deck */}
            <QuickMatchSwipeCard />

          {/* Top Cities Section */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Explore Top Cities</Text>
                <Text style={styles.sectionSubtitle}>Find properties in top locations</Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            >
              {topCities.map((city) => (
                <CityCircleCard key={city.id} city={city} />
              ))}
            </ScrollView>
          </View>

          {/* Recommended Section */}
          {filteredRecommended.length > 0 && (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <View>
                  <Text style={styles.sectionTitle}>Recommended For You</Text>
                  <Text style={styles.sectionSubtitle}>Based on your preferences</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PropertyList', { title: 'Recommended Properties', type: 'recommended' })}
                  activeOpacity={0.7}
                >
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.recommendedList}>
                {filteredRecommended.map((property) => (
                  <RecommendedCard key={property.id} property={property} />
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        )}

        {/* Scroll to Top FAB */}
        {showScrollTop && (
          <TouchableOpacity
            style={styles.scrollTopBtn}
            onPress={scrollToTop}
            activeOpacity={0.8}
          >
            <Icon name="arrow-up" size={18} color="#ffffff" />
            <Text style={styles.scrollTopText}>Top</Text>
          </TouchableOpacity>
        )}

        <BottomSheet
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          height={750}
        >
          {/* Header */}
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={() => {
              setFilterBeds(null);
              setFilterBaths(null);
              setFilterType([]);
              setFilterPrice(null);
              setFilterAmenities([]);
              setMode('Buy');
            }}>
              <Text style={styles.sheetResetText}>Reset</Text>
            </TouchableOpacity>
            <Text style={styles.sheetTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setFilterVisible(false)}>
              <Icon name="close" size={24} color="#161D2F" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScrollContent}>
            {/* Property Purpose */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Purpose</Text>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleBtn, mode === 'Buy' && styles.toggleBtnActive]}
                  onPress={() => { setMode('Buy'); setFilterPrice(null); }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.toggleText, mode === 'Buy' && styles.toggleTextActive]}>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleBtn, mode === 'Rent' && styles.toggleBtnActive]}
                  onPress={() => { setMode('Rent'); setFilterPrice(null); }}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.toggleText, mode === 'Rent' && styles.toggleTextActive]}>Rent</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Property Type */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Property Type</Text>
              <View style={styles.wrapContainer}>
                {['Apartment', 'House', 'Villa', 'Commercial', 'Plot'].map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[styles.wrapChip, filterType.includes(type) && styles.wrapChipActive]}
                    onPress={() => {
                      if (filterType.includes(type)) {
                        setFilterType(filterType.filter(t => t !== type));
                      } else {
                        setFilterType([...filterType, type]);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.wrapChipText, filterType.includes(type) && styles.wrapChipTextActive]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Price Range</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.priceRow}>
                {(mode === 'Buy' ? ['Under €500k', '€500k - €1M', '€1M - €2M', '€2M+'] : ['Under €1k', '€1k - €2k', '€2k - €5k', '€5k+']).map(price => (
                  <TouchableOpacity
                    key={price}
                    style={[styles.optionBtn, filterPrice === price && styles.optionBtnActive]}
                    onPress={() => setFilterPrice(filterPrice === price ? null : price)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, filterPrice === price && styles.optionTextActive]}>{price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Bedrooms */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Bedrooms (Min)</Text>
              <View style={styles.optionsRow}>
                {[null, 1, 2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num === null ? 'Any' : num}
                    style={[styles.optionBtn, filterBeds === num && styles.optionBtnActive]}
                    onPress={() => setFilterBeds(num)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, filterBeds === num && styles.optionTextActive]}>
                      {num === null ? 'Any' : `${num}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Bathrooms */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Bathrooms (Min)</Text>
              <View style={styles.optionsRow}>
                {[null, 1, 2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num === null ? 'Any' : num}
                    style={[styles.optionBtn, filterBaths === num && styles.optionBtnActive]}
                    onPress={() => setFilterBaths(num)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionText, filterBaths === num && styles.optionTextActive]}>
                      {num === null ? 'Any' : `${num}+`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Amenities */}
            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Amenities</Text>
              <View style={styles.wrapContainer}>
                {['Furnished', 'Balcony', 'Pool', 'Parking', 'Garden', 'AC'].map(amenity => (
                  <TouchableOpacity
                    key={amenity}
                    style={[styles.wrapChip, filterAmenities.includes(amenity) && styles.wrapChipActive]}
                    onPress={() => {
                      if (filterAmenities.includes(amenity)) {
                        setFilterAmenities(filterAmenities.filter(a => a !== amenity));
                      } else {
                        setFilterAmenities([...filterAmenities, amenity]);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.wrapChipText, filterAmenities.includes(amenity) && styles.wrapChipTextActive]}>{amenity}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.sheetFooter}>
            <TouchableOpacity
              style={styles.applyBtnFull}
              onPress={() => setFilterVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.applyBtnText}>Show {filteredFeatured.length + filteredRecommended.length} Results</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        {/* Location Selector Bottom Sheet */}
        <BottomSheet
          visible={locationModalVisible}
          onClose={() => setLocationModalVisible(false)}
          height={650}
        >
          <View style={styles.sheetHeader}>
            <View style={{ width: 40 }} />
            <Text style={styles.sheetTitle}>Select Location</Text>
            <TouchableOpacity onPress={() => setLocationModalVisible(false)} style={{ width: 40, alignItems: 'flex-end' }}>
              <Icon name="close" size={24} color="#161D2F" />
            </TouchableOpacity>
          </View>

          <View style={styles.locationSearchBox}>
            <Icon name="search-outline" size={20} color="#94A3B8" />
            <TextInput
              style={styles.locationSearchInput}
              placeholder="Search European cities..."
              placeholderTextColor="#94A3B8"
              value={locationSearchQuery}
              onChangeText={setLocationSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {locationSearchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setLocationSearchQuery('')}>
                <Icon name="close-circle" size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.locationListContent} keyboardShouldPersistTaps="handled">
            <TouchableOpacity 
              style={styles.locationItem}
              onPress={() => {
                setLocation('Current Location');
                setLocationModalVisible(false);
              }}
            >
              <View style={styles.currentLocationIcon}>
                <Icon name="navigate" size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.currentLocationText}>Use my current location</Text>
            </TouchableOpacity>

            <View style={styles.divider} />
            <Text style={styles.locationListTitle}>European Cities</Text>

            {EUROPEAN_CITIES.filter(city => city.toLowerCase().includes(locationSearchQuery.toLowerCase())).map(city => (
              <TouchableOpacity
                key={city}
                style={styles.locationItem}
                onPress={() => {
                  setLocation(city);
                  setLocationModalVisible(false);
                }}
              >
                <Icon name="location-outline" size={20} color={location === city ? colors.orange : "#94A3B8"} style={{ marginRight: 12 }} />
                <Text style={[styles.locationItemText, location === city && styles.locationItemTextActive]}>{city}</Text>
                {location === city && <Icon name="checkmark" size={20} color={colors.orange} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navyBlue,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tickerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFEDD5',
  },
  tickerBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  tickerBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tickerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  microFiltersRow: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 6,
  },
  microFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  microFilterChipActive: {
    backgroundColor: colors.navyBlue,
    borderColor: colors.navyBlue,
  },
  microFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  microFilterTextActive: {
    color: '#FFFFFF',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  bannerImage: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerImageStyle: {
    borderRadius: 20,
  },
  bannerOverlay: {
    padding: 20,
    backgroundColor: 'rgba(11, 30, 54, 0.72)',
    borderRadius: 20,
  },
  offerBadge: {
    backgroundColor: colors.orange,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  offerBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#E2E8F0',
    marginBottom: 16,
  },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orange,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bannerBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  sectionContainer: {
    marginTop: 22,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: colors.navyBlue,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.orange,
    fontWeight: '700',
  },
  featuredList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  recommendedList: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.navyBlue,
  },
  sheetResetText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.orange,
  },
  sheetScrollContent: {
    paddingBottom: 100,
  },
  filterSection: {
    marginBottom: 26,
  },
  filterSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  toggleTextActive: {
    color: colors.orange,
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  wrapChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  wrapChipActive: {
    backgroundColor: colors.navyBlue,
    borderColor: colors.navyBlue,
  },
  wrapChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  wrapChipTextActive: {
    color: '#FFFFFF',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priceRow: {
    gap: 8,
    paddingRight: 20,
  },
  optionBtn: {
    flex: 1,
    minWidth: 60,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  optionBtnActive: {
    backgroundColor: colors.navyBlue,
    borderColor: colors.navyBlue,
  },
  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  sheetFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 34, // Safe area for iOS
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  applyBtnFull: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollTopBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  scrollTopText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  locationSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  locationSearchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.navyBlue,
    paddingVertical: 0,
    marginLeft: 8,
  },
  locationListContent: {
    paddingBottom: 40,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  currentLocationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.orange,
  },
  locationItemText: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
  },
  locationItemTextActive: {
    fontWeight: '700',
    color: colors.navyBlue,
  },
  locationListTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 8,
  },
});

export default HomeScreen;
