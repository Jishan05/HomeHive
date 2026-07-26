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
import MyPropertiesSkeleton from '../../components/common/MyPropertiesSkeleton';
import { featuredProperties } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const MY_PROPERTIES_DUMMY = [
  {
    ...featuredProperties[0],
    id: 'my_p1',
    status: 'Active',
    views: 428,
    inquiries: 14,
    dateAdded: '12 July 2026',
  },
  {
    ...featuredProperties[2],
    id: 'my_p2',
    status: 'Active',
    views: 890,
    inquiries: 32,
    dateAdded: '01 July 2026',
  },
  {
    ...featuredProperties[4],
    id: 'my_p3',
    status: 'Pending',
    views: 45,
    inquiries: 2,
    dateAdded: '20 July 2026',
  },
];

const MyPropertiesScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [propertiesList, setPropertiesList] = useState(MY_PROPERTIES_DUMMY);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Pending'>('All');

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

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      'Delete Property',
      `Are you sure you want to remove "${title}" from your listings?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPropertiesList(prev => prev.filter(p => p.id !== id));
          },
        },
      ]
    );
  };

  const filteredProperties = propertiesList.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

  const renderPropertyItem = ({ item }: { item: typeof MY_PROPERTIES_DUMMY[0] }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeaderRow}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('PropertyDetail', { property: item })}
      >
        <Image source={{ uri: item.image }} style={styles.propertyImage} />

        <View style={styles.cardInfo}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                item.status === 'Active' ? styles.statusActive : styles.statusPending,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.status === 'Active' ? styles.statusTextActive : styles.statusTextPending,
                ]}
              >
                {item.status}
              </Text>
            </View>
            <Text style={styles.dateText}>{item.dateAdded}</Text>
          </View>

          <Text style={styles.propertyTitle} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>

          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      </TouchableOpacity>

      {/* Metrics & Actions Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Icon name="eye-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.views} Views</Text>
          </View>
          <View style={styles.metricItem}>
            <Icon name="chatbubble-ellipses-outline" size={14} color="#64748B" />
            <Text style={styles.metricText}>{item.inquiries} Inquiries</Text>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <Icon name="create-outline" size={18} color={colors.navyBlue} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionIconBtn, { marginLeft: 8 }]}
            onPress={() => handleDelete(item.id, item.title)}
            activeOpacity={0.7}
          >
            <Icon name="trash-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
        <Text style={styles.headerTitle}>My Listed Properties</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
          <Icon name="add" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsRow}>
        {(['All', 'Active', 'Pending'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabChip, activeTab === tab && styles.tabChipActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab} ({tab === 'All' ? propertiesList.length : propertiesList.filter(p => p.status === tab).length})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Properties List */}
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
          <MyPropertiesSkeleton />
        </ScrollView>
      ) : (
        <FlatList
          data={filteredProperties}
          keyExtractor={item => item.id}
          renderItem={renderPropertyItem}
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
              <Icon name="home-outline" size={50} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No Properties Found</Text>
              <Text style={styles.emptySubtitle}>You don't have any properties listed under this status.</Text>
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
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginRight: 10,
  },
  tabChipActive: {
    backgroundColor: colors.navyBlue,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
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
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 14,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusActive: {
    backgroundColor: '#DCFCE7',
  },
  statusPending: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusTextActive: {
    color: '#16A34A',
  },
  statusTextPending: {
    color: '#D97706',
  },
  dateText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.orange,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 12,
    paddingTop: 10,
  },
  metricsRow: {
    flexDirection: 'row',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  metricText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
  },
  actionIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
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

export default MyPropertiesScreen;
