import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';
import useUserStore from '../../store/useUserStore';

interface StatCardProps {
  icon: string;
  count: string;
  label: string;
}

const StatCard = ({ icon, count, label }: StatCardProps) => (
  <View style={styles.statCard}>
    <View style={styles.statIconContainer}>
      <Icon name={icon} size={24} color={colors.orange} />
    </View>
    <Text style={styles.statCount}>{count}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

interface MenuItemProps {
  icon: string;
  title: string;
  hasBorder?: boolean;
}

const MenuItem = ({ icon, title, hasBorder = true }: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
    <View style={styles.menuIconWrapper}>
      <Icon name={icon} size={22} color={colors.navyBlue} />
    </View>
    <View style={[styles.menuContent, hasBorder && styles.menuBorder]}>
      <Text style={styles.menuText}>{title}</Text>
      <Icon name="chevron-forward" size={20} color="#D1D5DB" />
    </View>
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }: any) => {
  const user = useUserStore();

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  const handleEdit = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Cover Image & Header Section */}
        <ImageBackground
          source={{ uri: user.coverImage }}
          style={styles.coverImage}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.16)', 'rgba(11, 30, 54, 0.32)', colors.navyBlue]}
            style={styles.gradientOverlay}
          >
            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
              <View style={styles.headerTop}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                  <Icon name="pencil" size={16} color="#FFF" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.profileInfoContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{ uri: user.profileImage }}
                    style={styles.profileImage}
                  />
                  <View style={styles.onlineBadge} />
                </View>
                <View style={styles.profileTextContainer}>
                  <View style={styles.nameRow}>
                    <Text style={styles.profileName}>{user.name}</Text>
                    <Icon name="checkmark-circle" size={20} color="#10B981" style={styles.verifiedIcon} />
                  </View>
                  <Text style={styles.profileEmail}>{user.email}</Text>
                  
                  {/* Real Estate Rating & Location */}
                  <View style={styles.ratingLocationRow}>
                    <Icon name="location" size={14} color="#D1D5DB" />
                    <Text style={styles.locationText}>Mumbai, IN</Text>
                    <View style={styles.dotSeparator} />
                    <Icon name="star" size={14} color="#FBBF24" />
                    <Text style={styles.ratingText}>4.9 (120+)</Text>
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.contentBody}>

          {/* Quick Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <Icon name="call" size={20} color="#FFF" />
              <Text style={styles.actionBtnText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]} activeOpacity={0.7}>
              <Icon name="chatbubble-ellipses" size={20} color={colors.navyBlue} />
              <Text style={[styles.actionBtnText, styles.actionBtnTextOutline]}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
              <Icon name="share-social" size={22} color={colors.navyBlue} />
            </TouchableOpacity>
          </View>

          {/* Quick Stats Grid */}
          <View style={styles.statsContainer}>
            <StatCard icon="home-outline" count="24" label="Listings" />
            <StatCard icon="heart-outline" count="156" label="Saved" />
            <StatCard icon="calendar-outline" count="12" label="Tours" />
          </View>

          {/* Activity Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>My Activity</Text>
            <View style={styles.floatingCard}>
              <MenuItem icon="key-outline" title="My Properties" />
              <MenuItem icon="notifications-outline" title="Saved Searches" />
              <MenuItem icon="map-outline" title="Tour Requests" hasBorder={false} />
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Account & Support</Text>
            <View style={styles.floatingCard}>
              <MenuItem icon="card-outline" title="Payment Methods" />
              <MenuItem icon="help-buoy-outline" title="Help Center" />
              <MenuItem icon="call-outline" title="Contact Agent" hasBorder={false} />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.6}>
            <Icon name="log-out-outline" size={20} color={colors.navyBlue} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Modern light cool grey
  },
  scrollContent: {
    paddingBottom: 40,
  },
  coverImage: {
    width: '100%',
    height: 320,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSafeArea: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 25,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981', // Emerald green
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  profileEmail: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 6,
  },
  ratingLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#D1D5DB',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '500',
  },
  dotSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 8,
  },
  ratingText: {
    color: '#FBBF24',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  contentBody: {
    paddingHorizontal: 20,
    marginTop: -20, // Overlap the content slightly over the cover header
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 5,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.orange,
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginRight: 10,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  actionBtnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowOpacity: 0.05,
    shadowColor: '#000',
  },
  actionBtnTextOutline: {
    color: colors.navyBlue,
  },
  iconBtn: {
    width: 52,
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.navyBlue,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.navyBlue,
    marginBottom: 15,
    marginLeft: 5,
    letterSpacing: 0.2,
  },
  floatingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 15,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  menuIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingRight: 15,
    marginLeft: 15,
  },
  menuBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    height: 56,
    marginTop: 10,
    marginBottom: 20, // Extra margin for bottom tab clearance
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: colors.navyBlue,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

export default ProfileScreen;
