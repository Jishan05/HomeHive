import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import FocusAwareStatusBar from '../../components/common/FocusAwareStatusBar';
import { chatMessages } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const ChatDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const selectedChat = route.params?.chat;

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  if (!selectedChat) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Chat not found</Text>
      </SafeAreaView>
    );
  }

  const handleViewPropertyDetails = () => {
    const propertyData = selectedChat.property || {
      id: 'chat_prop_' + selectedChat.id,
      title: selectedChat.propertyTitle,
      location: selectedChat.propertyLocation || 'Paris, France',
      price: selectedChat.propertyPrice || '$1,250,000',
      beds: 3,
      baths: 2,
      sqft: '2,400',
      image: selectedChat.propertyImage,
      isFavorite: false,
      category: 'Apartment',
    };
    (navigation as any).navigate('PropertyDetail', { property: propertyData });
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage = {
      id: `msg${Date.now()}`,
      text: inputText,
      sender: 'user',
      time: 'Just now',
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const renderMessageBubble = ({ item }: { item: any }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageWrapper, isUser ? styles.messageWrapperUser : styles.messageWrapperAgent]}>
        {!isUser && (
          <Image source={{ uri: selectedChat.agentAvatar }} style={styles.smallAvatar} />
        )}
        <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.agentBubble]}>
          <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.agentMessageText]}>
            {item.text}
          </Text>
          <Text style={[styles.messageTime, isUser ? styles.userMessageTime : styles.agentMessageTime]}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <FocusAwareStatusBar barStyle={'dark-content'} />

      {/* Chat Detail Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={22} color={colors.navyBlue} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerName}>{selectedChat.agentName}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -45}
      >
        {/* Property Context Card */}
        <TouchableOpacity
          style={styles.contextCard}
          activeOpacity={0.8}
          onPress={handleViewPropertyDetails}
        >
          <Image source={{ uri: selectedChat.propertyImage }} style={styles.contextImage} />
          <View style={styles.contextInfo}>
            <Text style={styles.contextTitle} numberOfLines={1}>{selectedChat.propertyTitle}</Text>
            <Text style={styles.contextAction}>View Details <Icon name="chevron-forward" size={12} /></Text>
          </View>
        </TouchableOpacity>

        {/* Messages List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageBubble}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
        />

        {/* Input Area */}
        <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.attachBtn}>
              <Icon name="add" size={22} color={colors.navyBlue} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendBtn, inputText.trim().length > 0 && styles.sendBtnActive]}
              onPress={sendMessage}
            >
              <Icon name="send" size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoid: {
    flex: 1,
  },
  bottomSafeArea: {
    backgroundColor: '#FFFFFF',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.3,
    borderBottomColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  backBtn: {
    padding: 6,
    marginRight: 6,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerStatus: {
    fontSize: 12,
    color: '#16A34A',
    fontWeight: '600',
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  contextImage: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 12,
  },
  contextInfo: {
    flex: 1,
  },
  contextTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  contextAction: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperAgent: {
    justifyContent: 'flex-start',
  },
  smallAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '78%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  userBubble: {
    backgroundColor: '#0F172A',
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  agentMessageText: {
    color: '#1E293B',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.65)',
  },
  agentMessageTime: {
    color: '#94A3B8',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0.3,
    borderTopColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  attachBtn: {
    width: 38,
    height: 38,
    backgroundColor: '#F1F5F9',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#0F172A',
    maxHeight: 100,
    minHeight: 38,
    borderWidth: 0.3,
    borderColor: '#CBD5E1',
  },
  sendBtn: {
    width: 38,
    height: 38,
    backgroundColor: '#CBD5E1',
    borderRadius: 19,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#0F172A',
  },
});

export default ChatDetailScreen;
