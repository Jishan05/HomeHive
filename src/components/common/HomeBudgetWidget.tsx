import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useModeStore } from '../../store/useModeStore';
import { colors } from '../../theme/colors';

const BUY_PRESETS = [
  { label: '€250,000', value: 250000, count: 14 },
  { label: '€500,000', value: 500000, count: 32 },
  { label: '€1,000,000', value: 1000000, count: 46 },
  { label: '€2,500,000+', value: 2500000, count: 58 },
];

const RENT_PRESETS = [
  { label: '€1,000 / mo', value: 1000, count: 22 },
  { label: '€2,000 / mo', value: 2000, count: 38 },
  { label: '€3,500 / mo', value: 3500, count: 52 },
  { label: '€5,000+ / mo', value: 5000, count: 64 },
];

const HomeBudgetWidget = () => {
  const navigation = useNavigation<any>();
  const mode = useModeStore(state => state.mode);
  const activePresets = mode === 'Buy' ? BUY_PRESETS : RENT_PRESETS;
  const [selectedBudget, setSelectedBudget] = useState(activePresets[1]);

  useEffect(() => {
    setSelectedBudget(activePresets[1]);
  }, [mode]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <View style={styles.iconBg}>
            <Icon name="calculator-outline" size={20} color={colors.orange} />
          </View>
          <View>
            <Text style={styles.title}>{mode === 'Buy' ? 'European Buying Budget' : 'Rental Affordability'}</Text>
            <Text style={styles.subtitle}>
              {mode === 'Buy' ? 'Filter properties by purchase budget in Euros' : 'Select monthly Euro rent range to match homes'}
            </Text>
          </View>
        </View>
      </View>

      {/* Preset Pills */}
      <View style={styles.presetsRow}>
        {activePresets.map((preset) => {
          const isSelected = selectedBudget.value === preset.value;
          return (
            <TouchableOpacity
              key={preset.value}
              style={[styles.presetChip, isSelected && styles.presetChipActive]}
              onPress={() => setSelectedBudget(preset)}
              activeOpacity={0.8}
            >
              <Text style={[styles.presetText, isSelected && styles.presetTextActive]}>
                {preset.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Result Counter Card */}
      <View style={styles.resultCard}>
        <View style={styles.resultTextWrapper}>
          <Text style={styles.resultCountText}>{selectedBudget.count} Verified Homes</Text>
          <Text style={styles.resultSubtext}>
            {mode === 'Buy' ? `Matching your ${selectedBudget.label} price budget` : `Matching your ${selectedBudget.label} monthly rent`}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => navigation.navigate('PropertyList', { title: `${mode === 'Buy' ? 'Buy' : 'Rent'} under ${selectedBudget.label}`, type: 'recommended' })}
          activeOpacity={0.85}
        >
          <Text style={styles.exploreBtnText}>Explore</Text>
          <Icon name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
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
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  presetChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  presetChipActive: {
    backgroundColor: colors.navyBlue,
    borderColor: colors.navyBlue,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.navyBlue,
  },
  presetTextActive: {
    color: '#FFFFFF',
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 14,
    padding: 12,
    paddingHorizontal: 14,
  },
  resultTextWrapper: {
    flex: 1,
  },
  resultCountText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navyBlue,
  },
  resultSubtext: {
    fontSize: 11,
    color: '#9A3412',
    marginTop: 1,
  },
  exploreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orange,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  exploreBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default HomeBudgetWidget;
