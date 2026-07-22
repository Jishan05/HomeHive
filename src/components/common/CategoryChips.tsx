import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../theme/colors';

export const categories = [
  { id: '1', name: 'All', icon: 'grid-outline' },
  { id: '2', name: 'House', icon: 'home-outline' },
  { id: '3', name: 'Apartment', icon: 'business-outline' },
  { id: '4', name: 'Villa', icon: 'leaf-outline' },
  { id: '5', name: 'Office', icon: 'briefcase-outline' },
  { id: '6', name: 'Condo', icon: 'key-outline' },
];

interface CategoryChipsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryChips: React.FC<CategoryChipsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((item) => {
          const isSelected = selectedCategory === item.name;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected
              ]}
              onPress={() => onSelectCategory(item.name)}
              activeOpacity={0.7}
            >
              <Icon 
                name={item.icon} 
                size={18} 
                color={isSelected ? '#ffffff' : colors.darkGrey} 
                style={styles.icon}
              />
              <Text style={[
                styles.text,
                isSelected && styles.textSelected
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2, // for android
  },
  chipSelected: {
    backgroundColor: colors.orange, // Primary active state
    borderColor: colors.orange,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkGrey,
  },
  textSelected: {
    color: '#ffffff',
  },
});

export default React.memo(CategoryChips);
