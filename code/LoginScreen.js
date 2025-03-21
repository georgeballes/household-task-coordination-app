import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskContext } from '../context/TaskContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useTaskContext();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    // In a real app, we would validate credentials
    // For the prototype, we'll just navigate to the main app
    const success = login(email, password);
    
    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>HT</Text>
        </View>
        <Text style={styles.appName}>HomeTask</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupContainer}>
          <Text style={styles.signupText}>
            Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A80F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333333',
  },
  loginButton: {
    backgroundColor: '#4A80F0',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#333333',
  },
  signupLink: {
    color: '#4A80F0',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
