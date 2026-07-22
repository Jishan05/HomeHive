import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import ScheduledToursSkeleton from '../../components/common/ScheduledToursSkeleton';
import { featuredProperties } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const TOURS_DUMMY = [
  {
    id: 'tour_1',
    property: featuredProperties[0],
    date: 'Tomorrow, 23 July 2026',
    time: '10:30 AM',
    status: 'Confirmed',
    agentName: 'Lucas Dubois',
    agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    id: 'tour_2',
    property: featuredProperties[2],
    date: 'Saturday, 25 July 2026',
    time: '03:00 PM',
    status: 'Pending',
    agentName: 'Emma Weber',
    agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 'tour_3',
    property: featuredProperties[4],
    date: '15 July 2026',
    time: '11:00 AM',
    status: 'Completed',
    agentName: 'Mateo Rossi',
    agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
];

const ScheduledToursScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [toursList, setToursList] = useState(TOURS_DUMMY);
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed'>('Upcoming');

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

  const handleCancelTour = (id: string, propertyTitle: string) => {
    Alert.alert(
      'Cancel Tour Visit',
      `Are you sure you want to cancel tour for "${propertyTitle}"?`,
      [
        { text: 'Keep Tour', style: 'cancel' },
        {
          text: 'Cancel Tour',
          style: 'destructive',
          onPress: () => {
            setToursList(prev => prev.filter(t => t.id !== id));
          },
        },
      ]
    );
  };

  const filteredTours = toursList.filter(item => {
    if (activeTab === 'Upcoming') {
      return item.status === 'Confirmed' || item.status === 'Pending';
    }
    return item.status === 'Completed';
  });

  const renderTourItem = ({ item }: { item: typeof TOURS_DUMMY[0] }) => (
    <View style={styles.card}>
      {/* Date Header Strip */}
      <View style={styles.dateStrip}>
        <View style={styles.dateTimeWrapper}>
          <Icon name="calendar-outline" size={16} color={colors.orange} />
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.dotText}>•</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            item.status === 'Confirmed'
              ? styles.statusConfirmed
              : item.status === 'Pending'
              ? styles.statusPending
              : styles.statusCompleted,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              item.status === 'Confirmed'
                ? styles.statusTextConfirmed
                : item.status === 'Pending'
                ? styles.statusTextPending
                : styles.statusTextCompleted,
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      {/* Property Details Row */}
      <TouchableOpacity
        style={styles.propertyRow}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PropertyDetail', { property: item.property })}
      >
        <Image source={{ uri: item.property.image }} style={styles.propertyImage} />
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {item.property.title}
          </Text>
          <Text style={styles.propertyLocation} numberOfLines={1}>
            {item.property.location}
          </Text>
          <Text style={styles.propertyPrice}>{item.property.price}</Text>
        </View>
      </TouchableOpacity>

      {/* Agent & Action Buttons Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.agentInfoRow}>
          <Image source={{ uri: item.agentAvatar }} style={styles.agentAvatar} />
          <View>
            <Text style={styles.agentLabel}>Assigned Agent</Text>
            <Text style={styles.agentName}>{item.agentName}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() =>
              navigation.navigate('ChatDetail', {
                chat: {
                  id: 'chat_' + item.id,
                  agentName: item.agentName,
                  agentAvatar: item.agentAvatar,
                  propertyTitle: item.property.title,
                  propertyImage: item.property.image,
                },
              })
            }
            activeOpacity={0.8}
          >
            <Icon name="chatbubble-ellipses-outline" size={16} color={colors.navyBlue} />
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>

          {item.status !== 'Completed' && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => handleCancelTour(item.id, item.property.title)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={20} color={colors.navyBlue} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scheduled Tours</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {(['Upcoming', 'Completed'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab} Tour Visits
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tours List */}
      {loading ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[colors.orange]}
              tintColor={colors.orange}
            />
          }
        >
          <ScheduledToursSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredTours}
          keyExtractor={item => item.id}
          renderItem={renderTourItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
              <Icon name="calendar-outline" size={50} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Tours Found</Text>
              <Text style={styles.emptySubtitle}>You don't have any {activeTab.toLowerCase()} tour visits scheduled.</Text>
            </View>
          }
        />
      )}
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
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  tabChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabChipActive: {
    backgroundColor: colors.navyBlue,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  dateStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 12,
  },
  dateTimeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navyBlue,
    marginLeft: 6,
  },
  dotText: {
    fontSize: 12,
    color: '#94A3B8',
    marginHorizontal: 4,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.orange,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusConfirmed: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusCompleted: {
    backgroundColor: '#E0F2FE',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextConfirmed: {
    color: '#16A34A',
  },
  statusTextPending: {
    color: '#D97706',
  },
  statusTextCompleted: {
    color: '#0284C7',
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 12,
  },
  propertyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.navyBlue,
    marginBottom: 2,
  },
  propertyLocation: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.orange,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  agentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  agentLabel: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  agentName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  chatBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navyBlue,
    marginLeft: 4,
  },
  cancelBtn: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginLeft: 8,
  },
  cancelBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#EF4444',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
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

export default ScheduledToursScreen;
