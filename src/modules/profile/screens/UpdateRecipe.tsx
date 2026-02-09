import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CreateRecipeStyles } from '../css/CreateRecipeStyles';
import useUpdateMyRecipe from '../hooks/useUpdateRecipe';
import useGetRecipeDetail from '../hooks/useGetRecipeDetail';
import {router} from "expo-router"

interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  description: string;
}

export default function UpdateRecipeScreen({ recipeId }: { recipeId: string }) {
  const { data: recipeDetail, isPending: getDetailPending } = useGetRecipeDetail(recipeId);
  const { mutate: updateRecipe, isPending: updatePending } = useUpdateMyRecipe();

  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [cookTime, setCookTime] = useState<string>('');
  const [familyNotes, setFamilyNotes] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  useEffect(() => {
    if (recipeDetail?.data) {
      const d = recipeDetail.data;
      setName(d.name || '');
      setCookTime(String(d.cookTime || ''));
      setFamilyNotes(d.familyNotes || '');
      setImage(d.image || null);
      
      if (d.ingredients && d.ingredients.length > 0) {
        setIngredients(d.ingredients);
      } else {
        setIngredients([{ name: '', quantity: '' }]);
      }

      if (d.instructions && d.instructions.length > 0) {
        setInstructions(d.instructions);
      } else {
        setInstructions([{ step: 1, description: '' }]);
      }
    }
  }, [recipeDetail]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const addStep = () => {
    setInstructions([
      ...instructions,
      { step: instructions.length + 1, description: '' }
    ]);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...instructions];
    newSteps[index].description = value;
    setInstructions(newSteps);
  };

  const handleUpdate = () => {
    if (!name.trim()) return alert("Vui lòng nhập tên món ăn");

    const formData = new FormData();
    formData.append('name', name);
    formData.append('cookTime', cookTime || '0');
    formData.append('familyNotes', familyNotes);

    if (image && !image.startsWith('http')) {
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;
      
      formData.append('image', {
        uri: image,
        name: filename,
        type,
      } as any);
    }

    const filteredIngredients = ingredients.filter(i => i.name.trim() !== '');
    const filteredInstructions = instructions.filter(s => s.description.trim() !== '');
    
    formData.append('ingredients', JSON.stringify(filteredIngredients));
    formData.append('instructions', JSON.stringify(filteredInstructions));
    updateRecipe({ recipeId: recipeId, formData: formData },
      {
        onSuccess: () => {
          router.push({
            pathname: "/(details)/exploreItemTabs/MyRecipeDetailTabs",
            params: { recipeId: recipeId }
          });
        }
      }
    );
  };

  if (getDetailPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F26522" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#F9F1E7' }}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <TouchableOpacity style={CreateRecipeStyles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={CreateRecipeStyles.previewImage} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="camera" size={40} color="#F26522" />
              <Text style={{ color: '#666', marginTop: 8 }}>Thêm ảnh bìa mới</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={CreateRecipeStyles.label}>Tên món ăn</Text>
        <TextInput
          style={CreateRecipeStyles.input}
          value={name}
          onChangeText={setName}
        />

        <View style={CreateRecipeStyles.rowBetween}>
          <View style={{ width: '48%' }}>
            <Text style={CreateRecipeStyles.label}>Thời gian nấu (phút)</Text>
            <TextInput
              style={CreateRecipeStyles.input}
              keyboardType="numeric"
              value={cookTime}
              onChangeText={setCookTime}
            />
          </View>
        </View>

        <View style={CreateRecipeStyles.rowBetween}>
          <Text style={CreateRecipeStyles.label}>Nguyên liệu</Text>
          <TouchableOpacity onPress={addIngredient}>
            <Text style={{ color: '#F26522', fontWeight: 'bold' }}>+ Thêm</Text>
          </TouchableOpacity>
        </View>
        {ingredients.map((item, index) => (
          <View key={index} style={CreateRecipeStyles.rowBetween}>
            <TextInput
              style={[CreateRecipeStyles.input, { width: '60%' }]}
              placeholder="Tên nguyên liệu"
              value={item.name}
              onChangeText={(v) => updateIngredient(index, 'name', v)}
            />
            <TextInput
              style={[CreateRecipeStyles.input, { width: '35%' }]}
              placeholder="Số lượng"
              value={item.quantity}
              onChangeText={(v) => updateIngredient(index, 'quantity', v)}
            />
          </View>
        ))}

        <View style={CreateRecipeStyles.rowBetween}>
          <Text style={CreateRecipeStyles.label}>Cách làm</Text>
          <TouchableOpacity onPress={addStep}>
            <Text style={{ color: '#F26522', fontWeight: 'bold' }}>+ Thêm bước</Text>
          </TouchableOpacity>
        </View>
        {instructions.map((step, index) => (
          <View key={index} style={CreateRecipeStyles.stepContainer}>
            <Text style={CreateRecipeStyles.stepLabel}>Bước {step.step}</Text>
            <TextInput
              style={CreateRecipeStyles.textArea}
              multiline
              value={step.description}
              onChangeText={(v) => updateStep(index, v)}
            />
          </View>
        ))}

        <Text style={CreateRecipeStyles.label}>Lưu ý cho gia đình</Text>
        <TextInput
          style={CreateRecipeStyles.input}
          value={familyNotes}
          onChangeText={setFamilyNotes}
        />

        <TouchableOpacity 
          style={[CreateRecipeStyles.submitBtn, updatePending && { opacity: 0.7 }]} 
          onPress={handleUpdate}
          disabled={updatePending}
        >
          {updatePending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={CreateRecipeStyles.submitBtnText}>Cập nhật công thức</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}