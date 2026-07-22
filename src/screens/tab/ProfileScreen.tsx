import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import { colors } from '../../theme/colors';
import useUserStore from '../../store/useUserStore';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const user = useUserStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
      <FocusAwareStatusBar barStyle={'light-content'} translucent backgroundColor="transparent" />

      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cover Photo Banner Header */}
        <View style={styles.coverContainer}>
          <Image source={{ uri: user.coverImage }} style={styles.coverImage} />

          {/* Edit Cover Camera Button */}
          <TouchableOpacity style={styles.editCoverBtn} onPress={handleEdit} activeOpacity={0.8}>
            <Icon name="camera" size={14} color="#FFFFFF" />
            <Text style={styles.editCoverText}>Edit Cover</Text>
          </TouchableOpacity>
        </View>

        {/* Centered Profile Avatar & Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.centeredAvatarWrapper}>
            <Image source={{ uri: user.profileImage }} style={styles.centeredAvatar} />
            <TouchableOpacity style={styles.cameraBadge} onPress={handleEdit} activeOpacity={0.8}>
              <Icon name="camera" size={15} color={colors.orange} />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userLocation}>📍 London, United Kingdom</Text>
        </View>

        {/* Minimal Flat Quick Stats (No Box Cards) */}
        <View style={styles.flatStatsRow}>
          <TouchableOpacity
            style={styles.flatStatItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PropertyList', { title: 'Saved Shortlists', type: 'featured' })}
          >
            <Text style={styles.statVal}>156</Text>
            <Text style={styles.statLbl}>Saved Homes</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            style={styles.flatStatItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ScheduledTours')}
          >
            <Text style={styles.statVal}>2</Text>
            <Text style={styles.statLbl}>Booked Tours</Text>
          </TouchableOpacity>

          <View style={styles.statDivider} />

          <TouchableOpacity
            style={styles.flatStatItem}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Message')}
          >
            <Text style={styles.statVal}>5</Text>
            <Text style={styles.statLbl}>Inquiries</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fullDivider} />

        {/* Group 1: My Activity */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeader}>MY ACTIVITY</Text>

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('PropertyList', { title: 'Saved Shortlists', type: 'featured' })}
          >
            <View style={styles.iconCircle}>
              <Icon name="heart-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Saved Shortlists</Text>
              <Text style={styles.rowSubtitle}>156 Shortlisted properties</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>

          <View style={styles.lineDivider} />

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('ScheduledTours')}
          >
            <View style={styles.iconCircle}>
              <Icon name="calendar-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Scheduled Tour Visits</Text>
              <Text style={styles.rowSubtitle}>2 Upcoming visits booked</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>

          <View style={styles.lineDivider} />

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Message')}
          >
            <View style={styles.iconCircle}>
              <Icon name="chatbubbles-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>My Inquiries & Chats</Text>
              <Text style={styles.rowSubtitle}>5 Conversations with agents</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>
        </View>

        <View style={styles.fullDivider} />

        {/* Group 2: Preferences & Security */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeader}>PREFERENCES & SECURITY</Text>

          <View style={styles.cleanRow}>
            <View style={styles.iconCircle}>
              <Icon name="notifications-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Push Notifications</Text>
              <Text style={styles.rowSubtitle}>Price drop & tour visit alerts</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#CBD5E1', true: colors.orange }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.lineDivider} />

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => Alert.alert('Payment Methods', 'Manage saved UPI, cards & bank details.')}
          >
            <View style={styles.iconCircle}>
              <Icon name="card-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Payment Methods</Text>
              <Text style={styles.rowSubtitle}>UPI, Visa & Saved Accounts</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>

          <View style={styles.lineDivider} />

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => Alert.alert('Security', 'Your account security is 100% active.')}
          >
            <View style={styles.iconCircle}>
              <Icon name="shield-checkmark-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Security & Privacy</Text>
              <Text style={styles.rowSubtitle}>Password, Face ID & 2FA</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>
        </View>

        <View style={styles.fullDivider} />

        {/* Group 3: Support & Legal */}
        <View style={styles.menuGroup}>
          <Text style={styles.groupHeader}>SUPPORT & LEGAL</Text>

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => Alert.alert('Support Helpline', 'Contact HomeHive Care: support@homehive.app')}
          >
            <View style={styles.iconCircle}>
              <Icon name="headset-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>24/7 Customer Support</Text>
              <Text style={styles.rowSubtitle}>Get instant help with bookings</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>

          <View style={styles.lineDivider} />

          <TouchableOpacity
            style={styles.cleanRow}
            activeOpacity={0.6}
            onPress={() => Alert.alert('Terms & Privacy', 'HomeHive App Terms & Privacy Policies v2.5.0')}
          >
            <View style={styles.iconCircle}>
              <Icon name="document-text-outline" size={18} color={colors.orange} />
            </View>
            <View style={styles.rowTextWrapper}>
              <Text style={styles.rowTitle}>Terms of Service</Text>
              <Text style={styles.rowSubtitle}>Read app usage rules</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={colors.orange} />
          </TouchableOpacity>
        </View>

        <View style={styles.fullDivider} />

        {/* Flat Minimalist Log Out Button */}
        <TouchableOpacity style={styles.flatLogoutRow} onPress={handleLogout} activeOpacity={0.6}>
          <Icon name="log-out-outline" size={20} color="#EF4444" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Log Out Account</Text>
        </TouchableOpacity>

        <Text style={styles.appFooterText}>HomeHive Real Estate • Version 2.5.0</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  coverContainer: {
    height: 190,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  topOverlaySafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topOverlayBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  topEditBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editCoverBtn: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(11, 30, 54, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  editCoverText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
  },
  profileSection: {
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  centeredAvatarWrapper: {
    position: 'relative',
    marginTop: -60,
    marginBottom: 10,
    alignSelf: 'center',
  },
  centeredAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.navyBlue,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 12,
  },
  editBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
  },
  editBtnPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.orange,
  },
  flatStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  flatStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navyBlue,
  },
  statLbl: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#F1F5F9',
  },
  fullDivider: {
    height: 8,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  menuGroup: {
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  groupHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  cleanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowTextWrapper: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  lineDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginLeft: 72,
  },
  flatLogoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    marginTop: 6,
    backgroundColor: '#FFFFFF',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
  appFooterText: {
    fontSize: 12,
    color: '#CBD5E1',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ProfileScreen;
