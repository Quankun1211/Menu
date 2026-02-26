import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RecipeHandBookStyles } from '../css/RecipeHandBookStyles';
import { router } from "expo-router";
import useGetMyRecipe from '../hooks/useGetMyRecipe';
import { MyRecipeResponse } from '../types/api-response';
import useDeleteMyRecipe from '../hooks/useDeleteMyRecipe';
import RenderMyRecipe from '../components/RenderMyRecipe';
import RenderSavedRecipe from '../components/RenderSavedRecipe';
import useGetSavedRecipe from '../hooks/useGetSavedRecipe';

export default function RecipeHandbook() {
  const [activeTab, setActiveTab] = useState('mine');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<MyRecipeResponse | null>(null);

  const { data: myRecipes, isPending: myRecipesPending } = useGetMyRecipe();
  const { data: savedRecipes, isPending: savedRecipesPending } = useGetSavedRecipe();
  const { mutate: deleteMyRecipe } = useDeleteMyRecipe();

  const openMenu = (item: MyRecipeResponse) => {
    setSelectedRecipe(item);
    setMenuVisible(true);
  };

  const handleUpdateRecipe = () => {
    setMenuVisible(false);
    router.push({
      pathname: "/(details)/exploreItemTabs/UpdateRecipeTabs" as any,
      params: { recipeId: selectedRecipe?._id }
    });
  };

  const handleDeleteRecipe = () => {
    setMenuVisible(false);
    if (selectedRecipe?._id) {
      deleteMyRecipe(selectedRecipe._id);
    }
  };

  const renderEmptyState = (type: 'saved' | 'mine') => (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100, paddingHorizontal: 40 }}>
      <Ionicons 
        name={type === 'saved' ? "heart-dislike-outline" : "journal-outline"} 
        size={80} 
        color="#DDD" 
      />
      <Text style={{ fontSize: 18, fontWeight: '600', color: '#666', marginTop: 16, textAlign: 'center' }}>
        {type === 'saved' ? "Chưa có công thức đã lưu" : "Bạn chưa tạo công thức nào"}
      </Text>
      <Text style={{ fontSize: 14, color: '#999', marginTop: 8, textAlign: 'center', marginBottom: 24 }}>
        {type === 'saved' 
          ? "Hãy khám phá những món ăn ngon và lưu lại để thực hiện nhé!" 
          : "Chia sẻ niềm đam mê nấu nướng của bạn với mọi người ngay thôi."}
      </Text>
      <TouchableOpacity 
        style={{ backgroundColor: '#D35400', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 25 }}
        onPress={() => router.push(type === 'saved' ? "/(details)/exploreItemTabs/ExploreRecipe" : "/(details)/exploreItemTabs/CreateRecipe")}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {type === 'saved' ? "Khám phá ngay" : "Tạo công thức đầu tiên"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={RecipeHandBookStyles.container}>
      <View style={RecipeHandBookStyles.tabContainer}>
        <TouchableOpacity 
          style={[RecipeHandBookStyles.tab, activeTab === 'mine' && RecipeHandBookStyles.activeTab]} 
          onPress={() => setActiveTab('mine')}
        >
          <Text style={[RecipeHandBookStyles.tabText, activeTab === 'mine' && RecipeHandBookStyles.activeTabText]}>Của tôi</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[RecipeHandBookStyles.tab, activeTab === 'saved' && RecipeHandBookStyles.activeTab]} 
          onPress={() => setActiveTab('saved')}
        >
          <Text style={[RecipeHandBookStyles.tabText, activeTab === 'saved' && RecipeHandBookStyles.activeTabText]}>Đã lưu</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
        {activeTab === 'mine' ? (
          <View style={{ padding: 16, flex: 1 }}>
            {(myRecipesPending) ? (
              <ActivityIndicator size="large" color="#D35400" style={{ marginTop: 50 }} />
            ) : myRecipes?.data && myRecipes.data.length > 0 ? (
              <>
                <View style={RecipeHandBookStyles.sectionHeader}>
                  <Text style={RecipeHandBookStyles.sectionTitle}>Bài viết của tôi</Text>
                  <Text style={RecipeHandBookStyles.filterText}>MỚI NHẤT</Text>
                </View>
                {myRecipes.data.map((item) => (
                  <RenderMyRecipe key={item._id} item={item} openMenu={openMenu} />
                ))}
                
                <View style={RecipeHandBookStyles.draftBox}>
                  <View style={RecipeHandBookStyles.draftIconContainer}>
                    <Ionicons name="book-outline" size={24} color="#4A614D" />
                  </View>
                  <Text style={RecipeHandBookStyles.draftText}>Bạn còn bản nháp chưa hoàn thiện</Text>
                  <TouchableOpacity><Text style={RecipeHandBookStyles.continueText}>Tiếp tục</Text></TouchableOpacity>
                </View>
              </>
            ) : renderEmptyState('mine')}
          </View>
        ) : (
          <View style={{ padding: 16, flex: 1 }}>
            {savedRecipesPending ? (
              <ActivityIndicator size="large" color="#D35400" style={{ marginTop: 50 }} />
            ) : savedRecipes?.data && savedRecipes.data.length > 0 ? (
              savedRecipes.data.map((item) => (
                <RenderSavedRecipe key={item._id} item={item} />
              ))
            ) : renderEmptyState('saved')}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        onPress={() => router.push("/(details)/exploreItemTabs/CreateRecipe")}
        style={[RecipeHandBookStyles.fab, { backgroundColor: '#D35400' }]}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable 
          style={RecipeHandBookStyles.modalOverlay} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={RecipeHandBookStyles.menuContainer}>
            <View style={RecipeHandBookStyles.dragHandle} />
            <Text style={RecipeHandBookStyles.menuTitle}>{selectedRecipe?.name}</Text>
            
            <TouchableOpacity 
              style={RecipeHandBookStyles.menuItem}
              onPress={handleUpdateRecipe}
            >
              <Ionicons name="create-outline" size={22} color="#333" />
              <Text style={RecipeHandBookStyles.menuText}>Chỉnh sửa công thức</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={RecipeHandBookStyles.menuItem}
              onPress={handleDeleteRecipe}
            >
              <Ionicons name="trash-outline" size={22} color="#FF3B30" />
              <Text style={[RecipeHandBookStyles.menuText, { color: '#FF3B30' }]}>Xóa bài viết</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[RecipeHandBookStyles.menuItem, { borderBottomWidth: 0 }]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={[RecipeHandBookStyles.menuText, { textAlign: 'center', width: '100%', color: '#999' }]}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}