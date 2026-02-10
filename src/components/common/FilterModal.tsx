import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';

export default function FilterModal({ visible, onClose, onSelect, currentSort }: any) {
  const options = [
    { id: 'newest', label: 'Mới nhất' },
    { id: 'price_asc', label: 'Giá: Thấp đến Cao' },
    { id: 'price_desc', label: 'Giá: Cao đến Thấp' },
    { id: 'sold_desc', label: 'Bán chạy nhất' },
    { id: 'sale', label: 'Giảm giá nhiều nhất' },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Sắp xếp sản phẩm</Text>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt.id} 
              style={[styles.option, currentSort === opt.id && styles.activeOption]}
              onPress={() => {
                onSelect(opt.id);
                onClose();
              }}
            >
              <Text style={[styles.optionText, currentSort === opt.id && styles.activeOptionText]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  option: {
    paddingVertical: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
  activeOption: {
    backgroundColor: '#fff5f0',
  },
  activeOptionText: {
    color: '#F26522',
    fontWeight: 'bold',
  }
});