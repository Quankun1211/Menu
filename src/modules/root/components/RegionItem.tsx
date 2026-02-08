import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { router } from "expo-router";

interface RegionItemProps {
  regionKey: string;
  title: string;
  sub: string;
  icon: any; 
}

const RegionItem = ({ regionKey, title, sub, icon }: RegionItemProps) => {
  return (
    <TouchableOpacity 
      onPress={() => 
        router.push({
          pathname: "/(details)/exploreItemTabs/ExploreFood",
          params: { regionId: regionKey }
        })
      }
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={icon} size={30} color="#F26522" />
      </View>
      
      <Text style={styles.regionTitle}>{title}</Text>
      <Text style={styles.regionSub} numberOfLines={1}>{sub}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  regionCard: {
    alignItems: 'center',
    width: '30%', 
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 18, 
    borderWidth: 1.5,
    borderColor: '#F26522',
    borderStyle: 'dashed', 
    backgroundColor: '#FFF8F5', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  regionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#F26522',
    textAlign: 'center',
  },
  regionSub: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    textAlign: 'center',
  },
});

export default RegionItem;