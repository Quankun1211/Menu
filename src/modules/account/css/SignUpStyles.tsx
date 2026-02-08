import { StyleSheet } from "react-native";
export const SignUpStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fcfaf7', 
    paddingBottom: 30,
  },
  imageContainer: {
    height: 140,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 50,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 25,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#F26522', 
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
  lastText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    paddingLeft: 24,
    paddingRight: 24,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    width: '48%',
    height: 50,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  loginText: {
    fontSize: 14,
    color: "#555",
  },

  loginLink: {
    fontSize: 14,
    color: "#E53935",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1, 
    height: '100%',
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 10,
  },


});