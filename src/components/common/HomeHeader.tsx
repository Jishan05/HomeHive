import React, { memo } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

interface HomeHeaderProps {
  onFilterPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ onFilterPress }) => {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.notificationBtn}>
            <Icon name="notifications-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="rgba(255, 255, 255, 0.7)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
            <Icon name="options-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.secondaryText, // updated to secondary text color
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 190, // Adjust width based on your logo's aspect ratio
    height: 40,
    left: -20
  },
  notificationBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    height: '100%',
  },
  filterBtn: {
    marginLeft: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default memo(HomeHeader);
