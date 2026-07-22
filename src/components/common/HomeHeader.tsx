import React, { memo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useModeStore } from '../../store/useModeStore';
import { colors } from '../../theme/colors';

interface HomeHeaderProps {
  onFilterPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onFilterPress }) => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const setMode = useModeStore(state => state.setMode);

  return (
    <View style={styles.container}>
      {/* Top Row 1: Large Logo (Left) & Mode Switcher + Bell (Right) */}
      <View style={styles.topRow}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.logo}
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
            <Icon name="notifications-outline" size={18} color="#FFFFFF" />
            <View style={styles.unreadDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Row 2: Location Selector Bar */}
      <View style={styles.locationRow}>
        <TouchableOpacity style={styles.locationBadge} activeOpacity={0.8}>
          <Icon name="location" size={14} color={colors.orange} />
          <Text style={styles.locationLabel}>Location:</Text>
          <Text style={styles.locationText}>London, UK</Text>
          <Icon name="chevron-down" size={12} color="#94A3B8" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      {/* Row 3: Search Input & Filter Button */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Icon name="search-outline" size={18} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={mode === 'Buy' ? "Search homes to buy..." : "Search homes for rent..."}
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
          />
        </View>
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress} activeOpacity={0.8}>
          <Icon name="options-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
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
    width: 215,
    height: 56,
    left: -25,
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
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
  },
  modeBtn: {
    paddingHorizontal: 12,
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
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  modeTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  notificationBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  unreadDot: {
    position: 'absolute',
    top: 7,
    right: 7,
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  locationLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginLeft: 4,
    marginRight: 3,
  },
  locationText: {
    fontSize: 12,
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
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    height: 42,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    height: '100%',
    paddingVertical: 0,
  },
  filterBtn: {
    marginLeft: 8,
    width: 42,
    height: 42,
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
