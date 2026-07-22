import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ImageBackground, RefreshControl } from 'react-native';
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
    return list;
  }, [activeCategory, mode]);

  const filteredRecommended = useMemo(() => {
    let list = recommendedProperties.filter(p => p.purpose === mode);
    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory);
    }
    return list;
  }, [activeCategory, mode]);

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
        <HomeHeader onFilterPress={() => setFilterVisible(true)} />

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
          height={350}
        >
          <Text style={styles.sheetTitle}>Filter Options</Text>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Property Purpose</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  mode === 'Buy' && styles.toggleBtnActive,
                ]}
                onPress={() => setMode('Buy')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    mode === 'Buy' && styles.toggleTextActive,
                  ]}
                >
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  mode === 'Rent' && styles.toggleBtnActive,
                ]}
                onPress={() => setMode('Rent')}
              >
                <Text
                  style={[
                    styles.toggleText,
                    mode === 'Rent' && styles.toggleTextActive,
                  ]}
                >
                  Rent
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setFilterVisible(false)}
          >
            <Text style={styles.applyBtnText}>Show Results</Text>
          </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.navyBlue,
    marginBottom: 24,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.navyBlue,
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
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
    color: colors.navyBlue,
  },
  toggleTextActive: {
    color: colors.orange,
  },
  applyBtn: {
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 30,
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
});

export default HomeScreen;
