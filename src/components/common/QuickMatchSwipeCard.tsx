import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useModeStore } from '../../store/useModeStore';
import { featuredProperties } from '../../data/dummyData';
import { colors } from '../../theme/colors';

const QuickMatchSwipeCard = () => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'saved' | 'skipped' | null>(null);

  const modeFilteredList = useMemo(() => {
    return featuredProperties.filter(p => p.purpose === mode);
  }, [mode]);

  const currentProperty = modeFilteredList[currentIndex % modeFilteredList.length] || featuredProperties[0];

  const handleAction = (action: 'saved' | 'skipped') => {
    setFeedback(action);
    setTimeout(() => {
      setFeedback(null);
      setCurrentIndex(prev => prev + 1);
    }, 400);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconBg}>
            <Icon name="flash-outline" size={20} color={colors.orange} />
          </View>
          <View>
            <Text style={styles.title}>{mode === 'Buy' ? 'Buy Quick Match' : 'Rent Quick Match'}</Text>
            <Text style={styles.subtitle}>Discover & shortlist {mode === 'Buy' ? 'homes for sale' : 'rental homes'} in seconds</Text>
          </View>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{mode}</Text>
        </View>
      </View>

      {/* Property Deck Card */}
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: currentProperty.image }} style={styles.image} />
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{currentProperty.category} • {currentProperty.purpose}</Text>
          </View>

          {/* Feedback Overlay */}
          {feedback && (
            <View
              style={[
                styles.feedbackOverlay,
                feedback === 'saved' ? styles.feedbackSaved : styles.feedbackSkipped,
              ]}
            >
              <Icon
                name={feedback === 'saved' ? 'heart' : 'close-circle'}
                size={36}
                color="#FFFFFF"
              />
              <Text style={styles.feedbackText}>
                {feedback === 'saved' ? 'Shortlisted' : 'Skipped'}
              </Text>
            </View>
          )}
        </View>

        {/* Info */}
        <TouchableOpacity
          style={styles.infoWrapper}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PropertyDetail', { property: currentProperty })}
        >
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>{currentProperty.price}</Text>
            <Text style={styles.specsText}>
              {currentProperty.beds} Beds • {currentProperty.baths} Baths • {currentProperty.sqft} sqft
            </Text>
          </View>

          <Text style={styles.propertyTitle} numberOfLines={1}>
            {currentProperty.title}
          </Text>

          <View style={styles.locationRow}>
            <Icon name="location-outline" size={14} color="#64748B" />
            <Text style={styles.locationText} numberOfLines={1}>
              {currentProperty.location}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action Controls */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => handleAction('skipped')}
            activeOpacity={0.8}
          >
            <Icon name="close" size={22} color="#64748B" />
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shortlistBtn}
            onPress={() => handleAction('saved')}
            activeOpacity={0.85}
          >
            <Icon name="heart" size={20} color="#FFFFFF" />
            <Text style={styles.shortlistBtnText}>Shortlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBg: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.navyBlue,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 1,
  },
  badge: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.orange,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  imageWrapper: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(11, 30, 54, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackSaved: {
    backgroundColor: 'rgba(22, 163, 74, 0.85)',
  },
  feedbackSkipped: {
    backgroundColor: 'rgba(239, 68, 68, 0.85)',
  },
  feedbackText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  infoWrapper: {
    padding: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.orange,
  },
  specsText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingBottom: 14,
    gap: 10,
  },
  skipBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 14,
  },
  skipBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 6,
  },
  shortlistBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  shortlistBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginLeft: 6,
  },
});

export default QuickMatchSwipeCard;
