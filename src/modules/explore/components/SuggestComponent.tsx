import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SuggestData {
  description?: string;
  dishes: string[];
}

const SuggestCard = ({ data }: { data: SuggestData }) => {
  if (!data || !data.dishes) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#2D5A27" />
        <Text style={styles.title}>Gợi ý kết hợp</Text>
      </View>

      <View style={styles.listContainer}>
        {data.dishes.map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        ))}
      </View>

      {data.description && (
        <Text style={styles.description}>
          {data.description}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F4F0',
    borderRadius: 24,
    padding: 24,
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D5A27',
    marginLeft: 8,
  },
  listContainer: {
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E25822',
    marginRight: 12,
  },
  itemText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 15,
  },
});

export default SuggestCard;