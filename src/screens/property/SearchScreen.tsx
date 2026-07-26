import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Keyboard 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const RECENT_SEARCHES = [
  'London, UK',
  'Luxury Penthouse',
  'New York Studio',
  'Miami Beach Villa'
];

const TRENDING_LOCATIONS = [
  'Dubai', 'Los Angeles', 'Paris', 'Tokyo', 'Singapore', 'Sydney'
];

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto-focus search input on mount
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleSearch = (searchQuery: string) => {
    Keyboard.dismiss();
    if (!searchQuery.trim()) return;
    
    // Navigate to property list with search query
    navigation.navigate('PropertyList', { 
      title: `Search: ${searchQuery}`, 
      type: 'search',
      query: searchQuery
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={colors.navyBlue} />
        </TouchableOpacity>
        
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="City, neighborhood, or address"
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
            onSubmitEditing={() => handleSearch(query)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        {/* Recent Searches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <TouchableOpacity>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentList}>
            {RECENT_SEARCHES.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.recentItem}
                onPress={() => handleSearch(item)}
              >
                <Icon name="time-outline" size={20} color="#94A3B8" />
                <Text style={styles.recentText}>{item}</Text>
                <Icon name="chevron-forward" size={16} color="#CBD5E1" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Trending Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Locations</Text>
          <View style={styles.trendingContainer}>
            {TRENDING_LOCATIONS.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.trendingChip}
                onPress={() => handleSearch(item)}
              >
                <Icon name="trending-up-outline" size={16} color={colors.orange} />
                <Text style={styles.trendingText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
    marginRight: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.navyBlue,
    paddingVertical: 0, // Fix Android alignment
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  clearText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.orange,
  },
  recentList: {
    gap: 16,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentText: {
    flex: 1,
    fontSize: 16,
    color: '#334155',
    marginLeft: 12,
  },
  divider: {
    height: 8,
    backgroundColor: '#F8FAFC',
  },
  trendingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  trendingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trendingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginLeft: 6,
  },
});

export default SearchScreen;
