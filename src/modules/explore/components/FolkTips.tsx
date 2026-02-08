import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RecipeStyle } from '../css/RecipeStyle';

interface FolkTipsProps {
  data: string[]; 
}

const FolkTips = ({ data }: FolkTipsProps) => {
    
  return (
    <View style={RecipeStyle.tipCard}>
      <View style={RecipeStyle.row}>
        <MaterialCommunityIcons name="auto-fix" size={20} color="#E25822" />
        <Text style={RecipeStyle.tipTitle}>Mẹo dân gian</Text>
      </View>
      
      {data.map((tip, index) => (
        <Text key={index} style={[RecipeStyle.tipText, { marginBottom: 4 }]}>
          • {tip}
        </Text>
      ))}
    </View>
  );
};

export default FolkTips;