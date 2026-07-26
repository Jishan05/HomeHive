import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView, RefreshControl,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import MessageScreenSkeleton from '../../components/common/MessageScreenSkeleton';
import { chatList } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const MessageScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 0.8s skeleton loader
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

  const filteredChats = chatList.filter(chat =>
    chat.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // For the horizontal "Active" agents list
  const activeAgents = chatList.slice(0, 5); // Just using the first few as a demo

  const renderActiveAgent = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.activeAgentContainer}
      onPress={() => navigation.navigate('ChatDetail', { chat: item })}
      activeOpacity={0.7}
    >
      <View style={styles.activeAvatarWrapper}>
        <Image source={{ uri: item.agentAvatar }} style={styles.activeAvatar} />
        <View style={styles.activeOnlineDot} />
      </View>
      <Text style={styles.activeAgentName} numberOfLines={1}>{item.agentName.split(' ')[0]}</Text>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.chatCard}
      onPress={() => navigation.navigate('ChatDetail', { chat: item })}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.agentAvatar }} style={styles.avatar} />
        {item.unreadCount > 0 && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.agentName} numberOfLines={1}>{item.agentName}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.propertyChip}>
          <Icon name="home" size={10} color="#475569" style={{ marginRight: 4 }} />
          <Text style={styles.propertyTitle} numberOfLines={1}>{item.propertyTitle}</Text>
        </View>
        <View style={styles.lastMessageRow}>
          <Text style={[styles.lastMessage, item.unreadCount > 0 && styles.lastMessageUnread]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (

    <View style={styles.safeArea}>


      <FocusAwareStatusBar barStyle={'dark-content'} />

      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.headerBackground}>
          {/* Inbox Header */}
          <View style={styles.inboxHeader}>
            <Text style={styles.inboxTitle}>Messages</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color={colors.secondaryText} style={{ opacity: 0.5 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search agent or property..."
              placeholderTextColor={colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Active Agents (Horizontal) */}
          {!searchQuery && (
            <View style={styles.activeSection}>
              <Text style={styles.sectionTitle}>Active Now</Text>
              <FlatList
                horizontal
                data={activeAgents}
                keyExtractor={(item) => 'active_' + item.id}
                renderItem={renderActiveAgent}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activeListContent}
              />
            </View>
          )}
        </View>

        {/* Chat List */}
        <View style={styles.listContainer}>
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
              <MessageScreenSkeleton />
            </ScrollView>
          ) : (
            <FlatList
              data={filteredChats}
              keyExtractor={(item) => item.id}
              renderItem={renderChatItem}
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
            />
          )}
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.navyBlue,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBackground: {
    backgroundColor: '#ffffff',
    paddingBottom: 5,
  },
  inboxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  inboxTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.secondaryText,
    letterSpacing: -0.5,
  },
  moreBtn: {
    padding: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 20,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: colors.navyBlue,
  },
  activeSection: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
    marginHorizontal: 24,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeListContent: {
    paddingHorizontal: 16,
  },
  activeAgentContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 64,
  },
  activeAvatarWrapper: {
    position: 'relative',
    marginBottom: 8,
    padding: 2,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.orange, // Vibrant ring for active status
  },
  activeAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#e2e8f0',
  },
  activeOnlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  activeAgentName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.navyBlue,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.3,
    borderBottomColor: '#CBD5E1',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#e2e8f0',
  },
  onlineDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 13,
    height: 13,
    borderRadius: 6.5,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  timeText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  propertyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  propertyTitle: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lastMessageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 13,
    color: '#64748B',
    marginRight: 10,
    fontWeight: '400',
  },
  lastMessageUnread: {
    color: colors.navyBlue,
    fontWeight: '700',
  },
  unreadBadge: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 22,
    alignItems: 'center',
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
});

export default MessageScreen;
