import React, { useState } from 'react';
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
import useCreateMyRecipe from '../hooks/useCreateMyRecipe';
import { CreateRecipeStyles } from '../css/CreateRecipeStyles';

interface Ingredient {
  name: string;
  quantity: string;
}

interface Instruction {
  step: number;
  description: string;
}

export default function CreateRecipeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [cookTime, setCookTime] = useState<string>('');

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', quantity: '' },
    { name: '', quantity: '' }
  ]);

  const [instructions, setInstructions] = useState<Instruction[]>([
    { step: 1, description: ''},
    { step: 2, description: ''}
  ]);

  // Giả định Hook của bạn trả về mutate và trạng thái loading
  const { mutate: createRecipe } = useCreateMyRecipe();
  const isPending = false; // Mock trạng thái

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
      { step: instructions.length + 1, description: ''}
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

  const handlePost = () => {
    if (!name.trim()) return alert("Vui lòng nhập tên món ăn");

    const formData = new FormData();
    
    // 1. Gắn các trường text
    formData.append('name', name);
    formData.append('cookTime', cookTime || '0');

    if (image) {
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

    console.log("Đang gửi FormData qua Hook...");
    createRecipe(formData); 
  };

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
              <Text style={{ color: '#666', marginTop: 8 }}>Thêm ảnh hoặc video bìa</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text style={CreateRecipeStyles.label}>Tên món ăn</Text>
        <TextInput
          style={CreateRecipeStyles.input}
          placeholder="VD: Cá kho tộ nghệ"
          value={name}
          onChangeText={setName}
        />

        <View style={CreateRecipeStyles.rowBetween}>
          <View style={{ width: '48%' }}>
            <Text style={CreateRecipeStyles.label}>Thời gian nấu (phút)</Text>
            <TextInput
              style={CreateRecipeStyles.input}
              placeholder="30"
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
              placeholder="Tiến hành nấu..."
              multiline
              value={step.description}
              onChangeText={(v) => updateStep(index, v)}
            />
          </View>
        ))}

        <TouchableOpacity 
          style={[CreateRecipeStyles.submitBtn, isPending && { opacity: 0.7 }]} 
          onPress={handlePost}
          disabled={isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={CreateRecipeStyles.submitBtnText}>Đăng công thức</Text>
          )}
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}