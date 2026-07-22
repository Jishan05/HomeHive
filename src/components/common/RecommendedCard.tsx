import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';

interface RecommendedCardProps {
  property: {
    title: string;
    location: string;
    price: string;
    beds: number;
    baths: number;
    sqft: string;
    image: string;
    isFavorite: boolean;
  };
}

const RecommendedCard: React.FC<RecommendedCardProps> = ({ property }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('PropertyDetail', { property })}
    >
      <Image source={{ uri: property.image }} style={styles.image} />
      
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
          <TouchableOpacity>
            <Icon
              name={property.isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={property.isFavorite ? '#ff4d4d' : colors.darkGrey}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.location} numberOfLines={1}>{property.location}</Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{property.price}</Text>
          
          <View style={styles.specsRow}>
            <View style={styles.spec}>
              <Icon name="bed-outline" size={14} color={colors.darkGrey} />
              <Text style={styles.specText}>{property.beds}</Text>
            </View>
            <View style={styles.spec}>
              <Icon name="water-outline" size={14} color={colors.darkGrey} />
              <Text style={styles.specText}>{property.baths}</Text>
            </View>
            <View style={styles.spec}>
              <Icon name="expand-outline" size={14} color={colors.darkGrey} />
              <Text style={styles.specText}>{property.sqft}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    height: 90,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.darkGrey,
    marginRight: 8,
  },
  location: {
    fontSize: 13,
    color: colors.darkGrey,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.orange,
  },
  specsRow: {
    flexDirection: 'row',
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  specText: {
    fontSize: 12,
    color: colors.darkGrey,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default RecommendedCard;
