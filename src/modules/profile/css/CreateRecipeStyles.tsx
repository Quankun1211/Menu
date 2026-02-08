import { StyleSheet } from "react-native";

export const CreateRecipeStyles = StyleSheet.create({
    label: { fontWeight: 'bold', fontSize: 16, marginVertical: 10, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10
  },
  imagePicker: {
    height: 180,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  previewImage: { width: '100%', height: '100%', borderRadius: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  stepLabel: { color: '#F26522', fontWeight: 'bold', marginBottom: 5 },
  textArea: { height: 80, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: '#F26522',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  submitBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
})