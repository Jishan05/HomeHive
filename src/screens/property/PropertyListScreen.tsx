import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import ExploreScreenSkeleton from '../../components/common/ExploreScreenSkeleton';
import { useModeStore } from '../../store/useModeStore';
import { featuredProperties, recommendedProperties } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const CATEGORIES = ['All', 'Villa', 'Apartment', 'House', 'Office', 'Condo'];

const PropertyListScreen = ({ route, navigation }: any) => {
  const { title = 'Properties', type = 'featured' } = route.params || {};

  const mode = useModeStore(state => state.mode);
  const sourceData = type === 'featured' ? featuredProperties : recommendedProperties;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
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
    sourceData.forEach(p => {
      initial[p.id] = p.isFavorite;
    });
    return initial;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 250 && !showScrollTop) {
      setShowScrollTop(true);
    } else if (offsetY <= 250 && showScrollTop) {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const filteredData = useMemo(() => {
    return sourceData.filter(property => {
      if (property.purpose !== mode) return false;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === 'All' || property.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, sourceData, mode]);

  const renderPropertyCard = ({ item }: { item: typeof sourceData[0] }) => {
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
              size={18}
              color={isFav ? '#FF4D4D' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{item.price}</Text>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color="#FBBF24" />
              <Text style={styles.ratingText}>4.9</Text>
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Modern Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-back" size={22} color={colors.navyBlue} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={18} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search in ${title.toLowerCase()}...`}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ padding: 4 }}>
              <Icon name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Horizontal Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
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

      {/* Main List */}
      <View style={styles.listSection}>
        {loading ? (
          <ExploreScreenSkeleton />
        ) : (
          <>
            <View style={styles.resultsBar}>
              <Text style={styles.resultsCount}>
                {filteredData.length} {filteredData.length === 1 ? 'Property' : 'Properties'} Available
              </Text>
            </View>

            <FlatList
              ref={flatListRef}
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={renderPropertyCard}
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
              <Icon name="search-outline" size={50} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Properties Found</Text>
              <Text style={styles.emptySubtitle}>
                No properties match your filter criteria. Try clearing search or category.
              </Text>
            </View>
          }
        />
        </>
      )}

        {/* Scroll to Top FAB */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navyBlue,
    letterSpacing: -0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.navyBlue,
    height: '100%',
  },
  categoryRow: {
    paddingRight: 10,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.navyBlue,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsBar: {
    marginVertical: 12,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  imageContainer: {
    height: 170,
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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
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
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 3,
  },
  propertyTitle: {
    fontSize: 16,
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
    marginLeft: 5,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
    marginTop: 12,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
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
});

export default PropertyListScreen;
