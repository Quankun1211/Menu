import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface NutritionData {
  calories: 1;
  protein: 1;
  fat: 1;
  carbs: 1;
  description: "string";
}

const NutritionCard = ({ data }: { data: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="leaf" size={20} color="#2D5A27" />
        <Text style={styles.title}>
          Dinh dưỡng <Text style={styles.subTitle}>(MỖI KHẨU PHẦN)</Text>
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatItem value={data.calories} label="CALORIES" />
        <StatItem value={`${data.protein}g`} label="PROTEIN" />
        <StatItem value={`${data.fat}g`} label="CHẤT BÉO" />
      </View>

      <Text style={styles.description}>
        {data.description}
      </Text>
    </View>
  );
};

const StatItem = ({ value, label }: { value: string | number; label: string }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F4F0',
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    marginBottom: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D5A27',
    marginLeft: 8,
  },
  subTitle: {
    fontSize: 10,
    color: '#888',
    fontWeight: '400',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation cho Android
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#333',
  },
  statLabel: {
    fontSize: 9,
    color: '#999',
    fontWeight: '600',
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

export default NutritionCard;