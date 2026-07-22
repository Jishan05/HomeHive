import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          <Icon name="home" size={10} color={colors.orange} style={{ marginRight: 4 }} />
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
    <>
      <FocusAwareStatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
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
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
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
    backgroundColor: '#F1F5F9',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.secondaryText,
    opacity: 0.8,
  },
  activeSection: {
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondaryText,
    opacity: 0.5,
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
    color: colors.secondaryText,
    opacity: 0.8,
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e2e8f0',
  },
  onlineDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  agentName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.secondaryText,
  },
  timeText: {
    fontSize: 12,
    color: colors.secondaryText,
    opacity: 0.4,
    fontWeight: '600',
  },
  propertyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 140, 0, 0.1)', // Very light orange tint
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  propertyTitle: {
    fontSize: 11,
    color: colors.orange,
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
    fontSize: 14,
    color: colors.secondaryText,
    opacity: 0.5,
    marginRight: 10,
    fontWeight: '400',
  },
  lastMessageUnread: {
    opacity: 0.9,
    fontWeight: '600', // Bold unread messages
  },
  unreadBadge: {
    backgroundColor: colors.orange,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 24,
    alignItems: 'center',
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default MessageScreen;
