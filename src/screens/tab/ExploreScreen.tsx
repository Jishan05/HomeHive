import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import BottomSheet from '../../components/common/BottomSheet';
import ExploreScreenSkeleton from '../../components/common/ExploreScreenSkeleton';
import { useModeStore } from '../../store/useModeStore';
import { allProperties } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const CATEGORIES = ['All', 'Villa', 'Apartment', 'House', 'Office', 'Condo'];

const ExploreScreen = () => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8s skeleton loader
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

  const [favorites, setFavorites] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    allProperties.forEach(p => {
      initial[p.id] = p.isFavorite;
    });
    return initial;
  });
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 300 && !showScrollTop) {
      setShowScrollTop(true);
    } else if (offsetY <= 300 && showScrollTop) {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      // Global Buy/Rent mode filter
      if (property.purpose !== mode) return false;

      // Search query filter (matches title or location)
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.category.toLowerCase().includes(query);

      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || property.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, mode]);

  const renderPropertyItem = ({ item }: { item: typeof allProperties[0] }) => {
    const isFav = favorites[item.id];

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PropertyDetail', { property: item })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.propertyImage} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.category}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.7}
          >
            <Icon
              name={isFav ? 'heart' : 'heart-outline'}
              size={20}
              color={isFav ? '#FF4B4B' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price}</Text>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color="#FBBF24" />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
          </View>

          <Text style={styles.propertyTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <View style={styles.locationRow}>
            <Icon name="location-outline" size={14} color="#64748B" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.specsRow}>
            <View style={styles.specItem}>
              <Icon name="bed-outline" size={16} color={colors.navyBlue} />
              <Text style={styles.specText}>{item.beds} Beds</Text>
            </View>
            <View style={styles.specItem}>
              <Icon name="water-outline" size={16} color={colors.navyBlue} />
              <Text style={styles.specText}>{item.baths} Baths</Text>
            </View>
            <View style={styles.specItem}>
              <Icon name="expand-outline" size={16} color={colors.navyBlue} />
              <Text style={styles.specText}>{item.sqft} sqft</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safeArea}>
      <FocusAwareStatusBar barStyle={'dark-content'} />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header & Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Properties</Text>
          <Text style={styles.headerSubtitle}>Find your perfect home or investment</Text>

          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by city, title or type..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
                clearButtonMode="while-editing"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                  <Icon name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.filterBtn,
                (selectedCategory !== 'All' || selectedType !== 'All') && styles.filterBtnActive,
              ]}
              onPress={() => setFilterVisible(true)}
              activeOpacity={0.8}
            >
              <Icon
                name="options-outline"
                size={22}
                color={selectedCategory !== 'All' || selectedType !== 'All' ? '#FFFFFF' : colors.navyBlue}
              />
            </TouchableOpacity>
          </View>

          {/* Categories Bar */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {CATEGORIES.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Main Properties List */}
        <View style={styles.listSection}>
          {loading ? (
            <ExploreScreenSkeleton />
          ) : (
            <>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCountText}>
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
                </Text>

                {(searchQuery !== '' || selectedCategory !== 'All') && (
                  <TouchableOpacity
                    onPress={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                  >
                    <Text style={styles.resetFiltersText}>Reset Filters</Text>
                  </TouchableOpacity>
                )}
              </View>

              <FlatList
                ref={flatListRef}
                data={filteredProperties}
                keyExtractor={item => item.id}
                renderItem={renderPropertyItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
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
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Icon name="search-outline" size={60} color="#CBD5E1" />
                    <Text style={styles.emptyTitle}>No Properties Found</Text>
                    <Text style={styles.emptySubtitle}>
                      We couldn't find any results matching "{searchQuery}". Try searching for a different city or category.
                    </Text>
                    <TouchableOpacity
                      style={styles.clearSearchBtn}
                      onPress={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                    >
                      <Text style={styles.clearSearchBtnText}>Clear Search</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            </>
          )}

          {/* Scroll to Top FAB Button */}
          {showScrollTop && (
            <TouchableOpacity
              style={styles.scrollTopBtn}
              onPress={scrollToTop}
              activeOpacity={0.8}
            >
              <Icon name="arrow-up" size={18} color="#FFFFFF" />
              <Text style={styles.scrollTopText}>Top</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Bottom Sheet */}
        <BottomSheet
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          height={380}
        >
          <Text style={styles.sheetTitle}>Filter Properties</Text>

          <Text style={styles.filterSectionTitle}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sheetCategoryRow}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.sheetCategoryChip,
                  selectedCategory === cat && styles.sheetCategoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.sheetCategoryText,
                    selectedCategory === cat && styles.sheetCategoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterSectionTitle}>Property Type</Text>
          <View style={styles.toggleContainer}>
            {(['All', 'Buy', 'Rent'] as const).map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.toggleBtn, selectedType === type && styles.toggleBtnActive]}
                onPress={() => setSelectedType(type)}
              >
                <Text style={[styles.toggleText, selectedType === type && styles.toggleTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.applyBtn}
            onPress={() => setFilterVisible(false)}
          >
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>
        </BottomSheet>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navyBlue,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.navyBlue,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.navyBlue,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  filterBtnActive: {
    backgroundColor: colors.orange,
  },
  categoriesContainer: {
    paddingRight: 10,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.navyBlue,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 14,
  },
  resultsCountText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  resetFiltersText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.orange,
  },
  listContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(11, 30, 54, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.orange,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 4,
  },
  propertyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.navyBlue,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: 13,
    color: colors.navyBlue,
    fontWeight: '600',
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navyBlue,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  clearSearchBtn: {
    backgroundColor: colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  clearSearchBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
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
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 6,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navyBlue,
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
    marginBottom: 10,
    marginTop: 8,
  },
  sheetCategoryRow: {
    marginBottom: 16,
  },
  sheetCategoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  sheetCategoryChipActive: {
    backgroundColor: colors.orange,
  },
  sheetCategoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.navyBlue,
  },
  sheetCategoryTextActive: {
    color: '#FFFFFF',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
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
  applyBtn: {
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExploreScreen;
