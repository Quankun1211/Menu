import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RecipeHandBookStyles } from '../css/RecipeHandBookStyles';
import {router} from "expo-router"
const MY_RECIPES = [
  { id: '1', title: 'Canh khổ qua cá thác lác', time: '35 ph', difficulty: 'Dễ', status: 'Đã đăng' },
  { id: '2', title: 'Sườn rim mặn ngọt', time: '45 ph', difficulty: 'Trung bình', status: 'Chờ duyệt' },
  { id: '3', title: 'Cá bống kho tiêu', time: '40 ph', difficulty: 'Trung bình', status: 'Đã đăng' },
];

const SAVED_RECIPES = [
  { id: '1', title: 'Cá bống kho tộ', time: '45 ph', difficulty: 'Trung bình', category: 'Món kho' },
  { id: '2', title: 'Thịt kho tàu nước dừa', time: '60 ph', difficulty: 'Khó', category: 'Món kho' },
];
export default function RecipeHandbook() {
  const [activeTab, setActiveTab] = useState('saved'); 

  const renderRecipeItem = (item: any) => (
  <View style={RecipeHandBookStyles.recipeCard} key={item.id}> 
    <View style={RecipeHandBookStyles.recipeImagePlaceholder} />
    <View style={RecipeHandBookStyles.recipeInfo}>
      <View style={RecipeHandBookStyles.titleRow}>
        <Text style={RecipeHandBookStyles.recipeTitle}>{item.title}</Text>
        <TouchableOpacity>
            {activeTab === "mine" && 
                <Ionicons name="ellipsis-vertical" size={18} color="#666" />
            }
        </TouchableOpacity>
      </View>
      <View style={RecipeHandBookStyles.metaRow}>
        <Ionicons name="time-outline" size={14} color="#888" />
        <Text style={RecipeHandBookStyles.metaText}>{item.time}</Text>
        <MaterialCommunityIcons name="fire" size={14} color="#888" style={{ marginLeft: 10 }} />
        <Text style={RecipeHandBookStyles.metaText}>{item.difficulty}</Text>
      </View>
      {item.status && (
        <View style={[RecipeHandBookStyles.statusBadge, { backgroundColor: item.status === 'Đã đăng' ? '#E8F5E9' : '#FFF3E0' }]}>
          <Text style={[RecipeHandBookStyles.statusText, { color: item.status === 'Đã đăng' ? '#4CAF50' : '#FF9800' }]}>{item.status}</Text>
        </View>
      )}
    </View>
    {activeTab === 'saved' && (
      <Ionicons name="bookmark" size={24} color="#D35400" style={RecipeHandBookStyles.bookmarkIcon} />
    )}
  </View>
);

  return (
    <View style={RecipeHandBookStyles.container}>
      <View style={RecipeHandBookStyles.tabContainer}>
        <TouchableOpacity 
          style={[RecipeHandBookStyles.tab, activeTab === 'saved' && RecipeHandBookStyles.activeTab]} 
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[RecipeHandBookStyles.tabText, activeTab === 'saved' && RecipeHandBookStyles.activeTabText]}>Đã lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[RecipeHandBookStyles.tab, activeTab === 'mine' && RecipeHandBookStyles.activeTab]} 
          onPress={() => setActiveTab('mine')}
        >
          <Text style={[RecipeHandBookStyles.tabText, activeTab === 'mine' && RecipeHandBookStyles.activeTabText]}>Của tôi</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {activeTab === 'mine' ? (
          <View style={{ padding: 16 }}>
            <View style={RecipeHandBookStyles.sectionHeader}>
              <Text style={RecipeHandBookStyles.sectionTitle}>Bài viết của tôi</Text>
              <Text style={RecipeHandBookStyles.filterText}>MỚI NHẤT</Text>
            </View>
            {MY_RECIPES.map(item => renderRecipeItem(item))}
            
            {/* Draft Box */}
            <View style={RecipeHandBookStyles.draftBox}>
              <View style={RecipeHandBookStyles.draftIconContainer}>
                <Ionicons name="book-outline" size={24} color="#4A614D" />
              </View>
              <Text style={RecipeHandBookStyles.draftText}>Bạn còn 2 bản nháp chưa hoàn thiện</Text>
              <TouchableOpacity><Text style={RecipeHandBookStyles.continueText}>Tiếp tục chỉnh sửa</Text></TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ padding: 16 }}>
            <Text style={RecipeHandBookStyles.sectionTitle}>Món kho</Text>
            {SAVED_RECIPES.map(item => renderRecipeItem(item))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push("/(details)/exploreItemTabs/CreateRecipe")}
        style={[RecipeHandBookStyles.fab, { backgroundColor: '#D35400'}]}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};
