import { StyleSheet } from "react-native";

export const VerifyStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  emailText: { fontWeight: '600', color: '#2ecc71' },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 40 },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#f9f9f9'
  },
  button: {
    backgroundColor: '#2ecc71',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resendContainer: { flexDirection: 'row', marginTop: 25 },
  resendText: { color: '#666', fontSize: 15 },
  resendLink: { color: '#2ecc71', fontSize: 15, fontWeight: 'bold' }
})