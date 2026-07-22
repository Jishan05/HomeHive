import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeHeader from '../../components/common/HomeHeader';
import CategoryChips from '../../components/common/CategoryChips';
import BottomSheet from '../../components/common/BottomSheet';
import FeaturedCard from '../../components/common/FeaturedCard';
import RecommendedCard from '../../components/common/RecommendedCard';
import CityCircleCard from '../../components/common/CityCircleCard';
import { featuredProperties, recommendedProperties, topCities } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const HomeScreen = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [propertyType, setPropertyType] = useState<'Buy' | 'Rent'>('Buy');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const filteredFeatured = useMemo(() => {
    if (activeCategory === 'All') return featuredProperties;
    return featuredProperties.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const filteredRecommended = useMemo(() => {
    if (activeCategory === 'All') return recommendedProperties;
    return recommendedProperties.filter(p => p.category === activeCategory);
  }, [activeCategory]);

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
    <SafeAreaView style={styles.safeArea}>
      <HomeHeader onFilterPress={() => setFilterVisible(true)} />

      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <CategoryChips
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Featured Section */}
        {filteredFeatured.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Properties</Text>
              <TouchableOpacity>
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

        {/* Top Cities Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Top Cities</Text>
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
              <Text style={styles.sectionTitle}>Recommended for you</Text>
              <TouchableOpacity>
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
          <Text style={styles.filterSectionTitle}>Property Type</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                propertyType === 'Buy' && styles.toggleBtnActive,
              ]}
              onPress={() => setPropertyType('Buy')}
            >
              <Text
                style={[
                  styles.toggleText,
                  propertyType === 'Buy' && styles.toggleTextActive,
                ]}
              >
                Buy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                propertyType === 'Rent' && styles.toggleBtnActive,
              ]}
              onPress={() => setPropertyType('Rent')}
            >
              <Text
                style={[
                  styles.toggleText,
                  propertyType === 'Rent' && styles.toggleTextActive,
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondaryText,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // slate-50
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.darkGrey,
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.orange,
    fontWeight: '600',
  },
  featuredList: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  recommendedList: {
    paddingHorizontal: 16,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondaryText,
    marginBottom: 24,
    textAlign: 'center',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkGrey,
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
    color: colors.darkGrey,
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
    bottom: 60,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#1E293B', // Modern dark slate color
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30, // Pill shape
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
