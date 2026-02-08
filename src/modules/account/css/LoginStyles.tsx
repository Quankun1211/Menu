import { StyleSheet } from "react-native"

export const LoginStyle = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    // backgroundColor: '#f8a078', 
    backgroundColor: 'transparent', 
    paddingBottom: 30,
  },
  content: {
    padding: 20,
    paddingTop: 0
  },
  logoWrapper: {
    marginTop: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoWrapperChild: {
    backgroundColor: '#eed3b4ab',
    padding: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ff941a', 
    borderStyle: 'dashed', 
  },
  leafIconBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#F26522',
    borderRadius: 15,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 20,
    textAlign: 'center'
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },

  form: {
    width: '100%',
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  
  // Style cho Input Container (giống SignUp)
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1E8', // Màu nền hơi cam nhạt cho Login
    borderWidth: 1,
    borderColor: '#F5E0D6',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    marginBottom: 5,
  },
  inputField: {
    flex: 1,
    height: '100%',
    color: '#333',
    fontSize: 16,
  },

  forgotPass: {
    textAlign: 'right',
    color: '#F26522',
    fontWeight: '600',
    marginTop: 10,
  },

  loginButton: {
    backgroundColor: '#F26522',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    elevation: 4,
    shadowColor: '#F26522',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Social Section
  socialSection: {
    width: '100%',
    marginTop: 40,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  socialIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialCircle: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Footer navigation
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    fontSize: 14,
    color: "#F26522",
    fontWeight: "bold",
  },
});
