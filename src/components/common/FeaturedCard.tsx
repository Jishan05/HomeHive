import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;

interface FeaturedCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    isFavorite: boolean;
    category?: string;
  };
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ property }) => {
  const navigation = useNavigation<any>();
  const [isFav, setIsFav] = useState(property.isFavorite);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PropertyDetail', { property })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.image} />
        {property.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{property.category}</Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => setIsFav(!isFav)}
          activeOpacity={0.7}
        >
          <Icon
            name={isFav ? 'heart' : 'heart-outline'}
            size={18}
            color={isFav ? '#FF4D4D' : '#FFFFFF'}
          />
        </TouchableOpacity>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>{property.price}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleRatingRow}>
          <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={12} color="#FBBF24" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <Icon name="location-outline" size={14} color="#64748B" />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={styles.specsRow}>
          <View style={styles.spec}>
            <Icon name="bed-outline" size={15} color={colors.navyBlue} />
            <Text style={styles.specText}>{property.beds} Beds</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="water-outline" size={15} color={colors.navyBlue} />
            <Text style={styles.specText}>{property.baths} Baths</Text>
          </View>
          <View style={styles.spec}>
            <Icon name="expand-outline" size={15} color={colors.navyBlue} />
            <Text style={styles.specText}>{property.sqft} sqft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
  },
  imageContainer: {
    height: 185,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(11, 30, 54, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: colors.orange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: colors.orange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
  detailsContainer: {
    padding: 16,
  },
  titleRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.navyBlue,
    marginRight: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
    marginLeft: 3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
    flex: 1,
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  specText: {
    fontSize: 12,
    color: colors.navyBlue,
    marginLeft: 5,
    fontWeight: '600',
  },
});

export default FeaturedCard;
