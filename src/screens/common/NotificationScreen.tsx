import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import { colors } from '../../theme/colors';

const DUMMY_NOTIFICATIONS = [
  {
    id: 'notif_1',
    type: 'price_drop',
    title: 'Price Drop Alert! 📉',
    message: 'Modern Villa in Beverly Hills dropped by $150,000! Don\'t miss out.',
    time: '5 mins ago',
    isRead: false,
    icon: 'trending-down-outline',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    targetScreen: 'PropertyDetail',
    targetParams: {
      property: {
        id: 'f_v1',
        title: 'Modern Villa with Pool',
        location: 'Beverly Hills, CA',
        price: '$2,350,000',
        beds: 4,
        baths: 3,
        sqft: '3,200',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        isFavorite: true,
        category: 'Villa',
      },
    },
  },
  {
    id: 'notif_2',
    type: 'tour',
    title: 'Tour Visit Confirmed ✅',
    message: 'Your property tour for Sea View Apartment is confirmed for tomorrow at 10:30 AM.',
    time: '1 hour ago',
    isRead: false,
    icon: 'calendar-outline',
    color: '#16A34A',
    bgColor: '#DCFCE7',
    targetScreen: 'ScheduledTours',
  },
  {
    id: 'notif_3',
    type: 'message',
    title: 'New Message from Rohan',
    message: 'Rohan Sharma: "Hi Monish, I can show you the penthouse this evening if you\'re free!"',
    time: '3 hours ago',
    isRead: false,
    icon: 'chatbubble-ellipses-outline',
    color: colors.orange,
    bgColor: '#FFF7ED',
    targetScreen: 'ChatDetail',
    targetParams: {
      chat: {
        id: 'chat_f_v1',
        agentName: 'Rohan Sharma',
        agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        propertyTitle: 'Modern Villa with Pool',
        propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      },
    },
  },
  {
    id: 'notif_4',
    type: 'alert',
    title: 'New Listing Alert 🏠',
    message: '3 new luxury apartments matching your search in Bandra West were just published.',
    time: 'Yesterday',
    isRead: true,
    icon: 'home-outline',
    color: '#0284C7',
    bgColor: '#E0F2FE',
    targetScreen: 'PropertyList',
    targetParams: { title: 'New Listings in Bandra', type: 'featured' },
  },
  {
    id: 'notif_5',
    type: 'system',
    title: 'Welcome to HomeHive! 🎉',
    message: 'Start exploring verified homes, save shortlists, and book free tour visits instantly.',
    time: '2 days ago',
    isRead: true,
    icon: 'sparkles-outline',
    color: '#9333EA',
    bgColor: '#F3E8FF',
  },
];

const NotificationScreen = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Unread'>('All');

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleItemPress = (item: typeof DUMMY_NOTIFICATIONS[0]) => {
    setNotifications(prev =>
      prev.map(n => (n.id === item.id ? { ...n, isRead: true } : n))
    );

    if (item.targetScreen) {
      navigation.navigate(item.targetScreen, item.targetParams);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'Unread') return !n.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotificationItem = ({ item }: { item: typeof DUMMY_NOTIFICATIONS[0] }) => (
    <TouchableOpacity
      style={[styles.notifCard, !item.isRead && styles.notifCardUnread]}
      activeOpacity={0.8}
      onPress={() => handleItemPress(item)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Icon name={item.icon} size={20} color={item.color} />
      </View>

      <View style={styles.notifContent}>
        <View style={styles.notifHeaderRow}>
          <Text style={[styles.notifTitle, !item.isRead && styles.notifTitleUnread]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <Text style={styles.messageText} numberOfLines={2}>
          {item.message}
        </Text>
      </View>

      {!item.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Header Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color={colors.navyBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
            <Text style={styles.readAllText}>Read all</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Filter Tabs Row */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'All' && styles.filterChipActive]}
          onPress={() => setActiveFilter('All')}
        >
          <Text style={[styles.filterText, activeFilter === 'All' && styles.filterTextActive]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, activeFilter === 'Unread' && styles.filterChipActive]}
          onPress={() => setActiveFilter('Unread')}
        >
          <Text style={[styles.filterText, activeFilter === 'Unread' && styles.filterTextActive]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={renderNotificationItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="notifications-off-outline" size={50} color="#CBD5E1" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>You don't have any unread notifications right now.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
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
  readAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.orange,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: colors.navyBlue,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 30,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  notifCardUnread: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FED7AA',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notifContent: {
    flex: 1,
  },
  notifHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
    flex: 1,
    marginRight: 8,
  },
  notifTitleUnread: {
    fontWeight: '800',
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  messageText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.orange,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default NotificationScreen;
