import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import useGetRecipeDetail from '../hooks/useGetRecipeDetail';
import { RecipeStyle } from '../css/RecipeStyle';
import NutritionCard from '../components/Nutrition';
import SuggestCard from '../components/SuggestComponent';
import FolkTips from '../components/FolkTips';
import useGetMe from '@/hooks/useGetMe';
import ModalLogin from '@/modules/product/components/ModalLogin';

const RecipeDetail = () => {
  const { data: meData } = useGetMe();
  const isLoggedIn = meData !== undefined;

  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: recipeDetail, isPending } = useGetRecipeDetail(id);
  const [selectedIngredients, setSelectedIngredients] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleCheck = (item: any) => {
    const isBuyable = item.itemType === 'Product';
    if (!isBuyable) return;

    const productId = item.ingredientId?._id;
    if (!productId) return;

    const isExisting = selectedIngredients.find(i => i.productId === productId);

    if (isExisting) {
      setSelectedIngredients(prev => prev.filter(i => i.productId !== productId));
    } else {
      setSelectedIngredients(prev => [
        ...prev, 
        {
          productId: productId,
          quantity: item.quantity || 1,
          name: item.ingredientId?.name || item.ingredientId?.customName
        }
      ]);
    }
  };

  const handleBuyIngredients = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
      return;
    }
    if (selectedIngredients.length === 0) {
      alert("Vui lòng chọn ít nhất một nguyên liệu có sẵn trong hệ thống.");
      return;
    }

    const itemsToCheckout = selectedIngredients.map(ing => ({
      productId: ing.productId,
      quantity: ing.quantity,
    }));

    router.push({
      pathname: "/(details)/checkoutTabs/CheckOutTabs",
      params: {
        source: "recipe",
        items: JSON.stringify(itemsToCheckout),
      },
    });
  };

  if (isPending) {
    return (
      <View style={[RecipeStyle.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#E25822" />
      </View>
    );
  }

  const recipe = recipeDetail?.data;

 const renderExtraInfo = () => {
  if (!recipe?.extraInfo || !Array.isArray(recipe.extraInfo)) return null;

  return recipe.extraInfo.map((item, index) => {
    const { type, data } = item;
    const itemKey = `extra-${type}-${index}`;

    switch (type) {
      case 'nutrition':
        // Kiểm tra xem data có dữ liệu thực tế không trước khi render
        if (!data || (!data.calories && !data.description)) return null;
        return <NutritionCard key={itemKey} data={data} />;

      case 'folkTips':
        // Kiểm tra mảng folkTips có phần tử không
        if (!data || (Array.isArray(data) && data.length === 0)) return null;
        return <FolkTips key={itemKey} data={data} />;

      case 'suggestedSideDishes':
        // Kiểm tra dishes có phần tử nào không trống không
        const hasValidDishes = data?.dishes?.some((d: string) => d && d.trim() !== "");
        if (!hasValidDishes && !data?.description) return null;
        return <SuggestCard key={itemKey} data={data} />;

      default:
        return null;
    }
  });
};
  return (
    <View style={RecipeStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={RecipeStyle.videoContainer}>
          <Image 
            source={recipe?.image ? { uri: recipe.image } : require("../../../assets/banner/gao.png")} 
            style={RecipeStyle.mainVideoImage} 
          />
        </View>
        <View style={{paddingHorizontal: 60, marginTop: 20}}>
          <Text style={RecipeStyle.recipeName}>{recipe?.name}</Text>
        </View>

        <View style={RecipeStyle.contentPadding}>
          <View style={RecipeStyle.summaryRow}>
            <SummaryBox value={recipe?.cookTime} label="PHÚT" icon="time-outline" />
            <View style={RecipeStyle.summaryDivider} />
            <SummaryBox value={recipe?.difficulty} label="ĐỘ KHÓ" icon="flash-outline" />
            <View style={RecipeStyle.summaryDivider} />
            <SummaryBox value={recipe?.meta?.servings} label="KHẨU PHẦN" icon="people-outline" />
          </View>

          <View style={RecipeStyle.sectionHeaderDetail}>
            <Text style={RecipeStyle.sectionTitleDetail}>Nguyên liệu chính</Text>
          </View>

          {recipe?.ingredients?.map((item: any) => {
            const productId = item.ingredientId?._id;
            const isBuyable = item.itemType === 'Product';
            const isChecked = selectedIngredients.some(ing => ing.productId === productId);
            
            return (
              <IngredientRow 
                key={item._id}
                name={item.ingredientId?.name || item.ingredientId?.customName || "Nguyên liệu"}
                weight={`${item.quantity} ${item.ingredientId?.unit || ''}`}
                isChecked={isChecked}
                onToggle={() => toggleCheck(item)}
                isDisabled={!isBuyable}
              />
            );
          })}

          {recipe?.additionalIngredients && recipe.additionalIngredients.length > 0 && (
            <>
              <View style={[RecipeStyle.sectionHeaderDetail, { marginTop: 20 }]}>
                <Text style={RecipeStyle.sectionTitleDetail}>Gia vị & Phụ liệu</Text>
              </View>

              {recipe.additionalIngredients.map((item: any, index: number) => (
                <IngredientRow 
                  key={`add-${index}`}
                  name={item.name}
                  weight={`${item.quantity} ${item.unit || ''}`}
                  isChecked={false}
                  onToggle={() => {}} 
                  isDisabled={false}
                  isAdditional={true}
                />
              ))}
            </>
          )}

          <Text style={[RecipeStyle.sectionTitleDetail, { marginTop: 30, marginBottom: 20 }]}>Các bước thực hiện</Text>
          {recipe?.instructions?.sort((a: any, b: any) => a.step - b.step).map((item: any, index: number) => (
            <StepItem 
              key={`step-${index}`}
              number={item.step} 
              title={item.title}
              desc={item.description}
              isLast={index === (recipe.instructions.length - 1)}
            />
          ))}

          {renderExtraInfo()}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={RecipeStyle.footer}>
        <TouchableOpacity 
          style={[RecipeStyle.buyAllButton, selectedIngredients.length === 0 && { backgroundColor: '#CCC' }]} 
          onPress={handleBuyIngredients}
        >
          <Ionicons name="basket" size={20} color="white" />
          <Text style={RecipeStyle.buyAllText}>
            {selectedIngredients.length > 0 ? `Mua (${selectedIngredients.length}) nguyên liệu` : "Mua nguyên liệu"}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalLogin
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </View>
  );
};

const SummaryBox = ({ value, label, icon }: any) => (
  <View style={RecipeStyle.summaryItem}>
    <Text style={RecipeStyle.summaryValue}>{value}</Text>
    <View style={RecipeStyle.summaryLabelRow}>
      <Ionicons name={icon} size={14} color="#888" />
      <Text style={RecipeStyle.summaryLabel}> {label}</Text>
    </View>
  </View>
);

const IngredientRow = ({ name, weight, isChecked, onToggle, isAdditional, isDisabled }: any) => (
  <TouchableOpacity 
    activeOpacity={(isDisabled || isAdditional) ? 1 : 0.7}
    style={[
      RecipeStyle.ingredientItem, 
      isDisabled && { backgroundColor: '#F9F9F9', borderColor: '#EEE' }
    ]}
    onPress={onToggle}
  >
    <View style={RecipeStyle.row}>
      {!isAdditional ? (
        <Ionicons 
          name={isDisabled ? "remove-circle-outline" : (isChecked ? "checkbox" : "square-outline")} 
          size={24} 
          color={isDisabled ? "#CCC" : (isChecked ? "#E25822" : "#DDD")} 
        />
      ) : (
        <Ionicons name="ellipse" size={8} color="#E25822" style={{ marginRight: 8, marginLeft: 5 }} />
      )}
      <View style={{ marginLeft: isAdditional ? 0 : 10 }}>
        <Text style={[
          RecipeStyle.ingredientName, 
          isChecked && { color: '#E25822' },
          isDisabled && { color: '#999' }
        ]}>
          {name}
        </Text>
        {isDisabled && !isAdditional && <Text style={{ fontSize: 10, color: '#BBB' }}>Không có sẵn để mua</Text>}
      </View>
    </View>
    <Text style={[RecipeStyle.ingredientWeight, isDisabled && { color: '#BBB' }]}>{weight}</Text>
  </TouchableOpacity>
);

const StepItem = ({ number, title, desc, isLast }: any) => (
  <View style={RecipeStyle.stepContainer}>
    <View style={RecipeStyle.stepLeft}>
      <View style={RecipeStyle.stepNumber}><Text style={RecipeStyle.stepNumberText}>{number}</Text></View>
      {!isLast && <View style={RecipeStyle.stepLine} />}
    </View>
    <View style={RecipeStyle.stepRight}>
      <Text style={RecipeStyle.stepTitle}>{title}</Text>
      <Text style={RecipeStyle.stepDesc}>{desc}</Text>
    </View>
  </View>
);

export default RecipeDetail;