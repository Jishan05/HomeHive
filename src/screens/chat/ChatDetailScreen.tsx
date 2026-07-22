import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
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
    <SafeAreaView style={styles.safeArea}>
      {/* Chat Detail Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color={colors.secondaryText} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerName}>{selectedChat.agentName}</Text>
          <Text style={styles.headerStatus}>Online</Text>
        </View>
      </View>

      {/* Property Context Card */}
      <View style={styles.contextCard}>
        <Image source={{ uri: selectedChat.propertyImage }} style={styles.contextImage} />
        <View style={styles.contextInfo}>
          <Text style={styles.contextTitle} numberOfLines={1}>{selectedChat.propertyTitle}</Text>
          <Text style={styles.contextAction}>View Details <Icon name="chevron-forward" size={12} /></Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageBubble}
        contentContainerStyle={styles.messagesList}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
            <Icon name="add" size={24} color={colors.secondaryText} />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor={colors.secondaryText}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backBtn: {
    padding: 8,
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondaryText,
  },
  headerStatus: {
    fontSize: 13,
    color: '#22c55e',
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: 8,
    marginLeft: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
  },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    margin: 16,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  contextImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  contextInfo: {
    flex: 1,
  },
  contextTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.secondaryText,
    marginBottom: 4,
  },
  contextAction: {
    fontSize: 13,
    color: colors.orange,
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
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: colors.orange,
    borderBottomRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: '#f1f5f9',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#ffffff',
  },
  agentMessageText: {
    color: colors.secondaryText,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  agentMessageTime: {
    color: colors.secondaryText,
    opacity: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: '#ffffff',
  },
  attachBtn: {
    padding: 10,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    color: colors.secondaryText,
    maxHeight: 100,
    minHeight: 40,
  },
  sendBtn: {
    padding: 10,
    backgroundColor: '#cbd5e1',
    borderRadius: 20,
    marginLeft: 12,
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnActive: {
    backgroundColor: colors.orange,
  },
});

export default ChatDetailScreen;
