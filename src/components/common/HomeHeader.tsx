import React, { memo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useModeStore } from '../../store/useModeStore';
import { colors } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 375;
const isTablet = SCREEN_WIDTH >= 768;

// Dynamic responsive sizing calculations
const logoWidth = Math.min(SCREEN_WIDTH * 0.46, isTablet ? 260 : 190);
const logoHeight = (logoWidth * 56) / 215;

interface HomeHeaderProps {
  onFilterPress?: () => void;
  location?: string;
  onLocationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onFilterPress, location = 'London, UK', onLocationPress }) => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const setMode = useModeStore(state => state.setMode);

  return (
    <View style={styles.container}>
      {/* Top Row 1: Large Logo (Left) & Mode Switcher + Bell (Right) */}
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={[styles.logo, { width: logoWidth, height: logoHeight }]}
          resizeMode="contain"
        />

        <View style={styles.rightActionsRow}>
          {/* Buy / Rent Segmented Mode Switcher */}
          <View style={styles.modeToggleContainer}>
            <TouchableOpacity
              style={[styles.modeBtn, mode === 'Buy' && styles.modeBtnActive]}
              onPress={() => setMode('Buy')}
              activeOpacity={0.85}
            >
              <Text style={[styles.modeText, mode === 'Buy' && styles.modeTextActive]}>Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeBtn, mode === 'Rent' && styles.modeBtnActive]}
              onPress={() => setMode('Rent')}
              activeOpacity={0.85}
            >
              <Text style={[styles.modeText, mode === 'Rent' && styles.modeTextActive]}>Rent</Text>
            </TouchableOpacity>
          </View>

          {/* Notification Bell Button */}
          <TouchableOpacity
            style={styles.notificationBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Notification')}
          >
            <Icon name="notifications-outline" size={isSmallDevice ? 16 : 18} color="#FFFFFF" />
            <View style={styles.unreadDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Row 2: Location Selector Bar */}
      <View style={styles.locationRow}>
        <TouchableOpacity style={styles.locationBadge} activeOpacity={0.8} onPress={onLocationPress}>
          <Icon name="location" size={isSmallDevice ? 12 : 14} color={colors.orange} />
          <Text style={styles.locationLabel}>Location:</Text>
          <Text style={styles.locationText}>{location}</Text>
          <Icon name="chevron-down" size={12} color="#94A3B8" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      {/* Row 3: Search Input & Filter Button */}
      <View style={styles.searchRow}>
        <TouchableOpacity 
          style={styles.searchContainer} 
          activeOpacity={0.8}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Icon name="search-outline" size={isSmallDevice ? 16 : 18} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
          <Text style={styles.fakeInputText}>
            {mode === 'Buy' ? "Search homes to buy..." : "Search homes for rent..."}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress} activeOpacity={0.8}>
          <Icon name="options-outline" size={isSmallDevice ? 18 : 20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Math.min(SCREEN_WIDTH * 0.04, 20),
    paddingTop: 6,
    paddingBottom: 12,
    backgroundColor: colors.navyBlue,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  logo: {
    left: isSmallDevice ? -12 : -20,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    padding: 3,
    marginRight: isSmallDevice ? 4 : 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  modeBtn: {
    paddingHorizontal: isSmallDevice ? 8 : 12,
    paddingVertical: 5,
    borderRadius: 11,
  },
  modeBtnActive: {
    backgroundColor: colors.orange,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  modeText: {
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  modeTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  notificationBtn: {
    width: isSmallDevice ? 32 : 36,
    height: isSmallDevice ? 32 : 36,
    borderRadius: isSmallDevice ? 16 : 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  unreadDot: {
    position: 'absolute',
    top: isSmallDevice ? 5 : 7,
    right: isSmallDevice ? 5 : 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.orange,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -4,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: isSmallDevice ? 8 : 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  locationLabel: {
    fontSize: isSmallDevice ? 10 : 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 3,
  },
  locationText: {
    fontSize: isSmallDevice ? 11 : 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: isSmallDevice ? 10 : 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    height: isSmallDevice ? 38 : 42,
  },
  searchIcon: {
    marginRight: 6,
  },
  fakeInputText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: isSmallDevice ? 12 : 13,
  },
  filterBtn: {
    marginLeft: 8,
    width: isSmallDevice ? 38 : 42,
    height: isSmallDevice ? 38 : 42,
    borderRadius: 12,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default memo(HomeHeader);
