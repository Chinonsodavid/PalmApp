import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Title with shadow effect */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PALM</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email or Phone Number"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={styles.input}
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('PasswordReset')}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Log In Button */}
      <TouchableOpacity
        onPress={() => navigation.replace('Home')}
        style={styles.loginButton}
      >
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031c26',
    paddingHorizontal: 24,
    paddingTop: 112,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: '400',
    color: '#fff',
    zIndex: 1,
  },

  inputGroup: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  forgotButton: {
    marginBottom: 32,
  },
  forgotText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'right',
    opacity: 0.8,
  },
  loginButton: {
    backgroundColor: '#247c6d',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dividerText: {
    color: '#fff',
    marginHorizontal: 16,
    fontSize: 16,
    opacity: 0.6,
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});