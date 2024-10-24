import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import ImagemTopoLogin from "../../../Image/Logo-Prime-Prime_Prime.png";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, signInWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import firebaseConfig from '../../../data/firebaseConfig.js';
import styles from './LoginCSS';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export default function Login() {
    const navigation = useNavigation();
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false); // Estado para controlar o envio de dados
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    
    
const handleEmailChange = (text) => {
  let newText = text; // Converter o texto para letras minúsculas
  let newSelection = selection;

  if (newText === '') {
    setEmail('');
    setInvalidEmail(false);
    newSelection = { start: 0, end: 0 };
  } else if (newText.startsWith('@') || newText.includes('@@')) {
    setInvalidEmail(true);
    setEmail('');
    newSelection = { start: 0, end: 0 };
  } else if (newText.includes('@gmail.com')) {
    const atIndex = newText.indexOf('@');
    const domainPart = newText.slice(atIndex + 1);
    if (domainPart === 'gmail.com' && atIndex > 0) {
      setEmail(newText);
      setInvalidEmail(false);
    } else {
      setEmail(newText);
      setInvalidEmail(true);
    }
  } else if (newText.includes('@')) {
    setInvalidEmail(true);
    setEmail(newText);
  } else if (newText.length === 1 && newText !== '@') {
    newText = newText + '@gmail.com';
    setEmail(newText);
    newSelection = { start: text.length, end: text.length };
  } else {
    newText = newText + '@gmail.com';
    setEmail(newText);
    newSelection = { start: text.length, end: text.length };
  }

  setSelection(newSelection);
};
      
      
      

    // Aqui coloca o "@gmail.com" após digitar qualquer letra
    const inputStyleEmail = email === ''
      ? styles.LoginInputSemValor
      : email.includes('@gmail.com') && !invalidEmail
      ? styles.LoginInputComValor
      : styles.LoginInputComValorInvalido;

    const inputStyleSenha = senha ? styles.LoginInputComValor : styles.LoginInputSemValor;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        setIsLoggingIn(true); // Definir o estado como verdadeiro ao iniciar o processo de login
        signInWithEmailAndPassword(auth, email, senha)
          .then((userCredential) => {
            // Login bem-sucedido
            setIsLoggingIn(false); // Definir o estado como falso após o login ser concluído
            const user = userCredential.user;
            Alert.alert('Login bem-sucedido!', `Bem-vindo, ${user.email}`);
            navigation.navigate('Home');
          })
          .catch((error) => {
            // Erro no login
            setIsLoggingIn(false); // Definir o estado como falso em caso de erro
            const errorCode = error.code;
            const errorMessage = error.message;
    
            if (errorCode === 'auth/user-not-found') {
              // Nenhum usuário encontrado, exibir mensagem amigável
              Alert.alert('Nenhum usuário encontrado', 'Por favor, verifique suas credenciais ou registre-se para criar uma conta.');
            } else {
              // Outro erro, exibir mensagem padrão de erro
              Alert.alert('Erro no login', errorMessage);
            }
          });
      };
    
      function EsqueceuSenha(){
        Alert.alert("Esqueceu a senha", "você é burro");
      }

    return (
        <SafeAreaView style={styles.ConfigContainerLogin}>
            <ScrollView style={styles.containerLogin}>

                <View style={styles.LoginTopo}>
                    <View style={styles.LoginTopoImagem}>
                        <Image
                            source={ImagemTopoLogin}
                            style={styles.LoginImage}
                        />
                    </View>
                    <View style={styles.LoginTopoTitulo}>
                        <Text style={styles.LoginTopoTituloText}>Logar</Text>
                    </View>
                </View>
                
                <View style={styles.LoginMeio}>
                    <View style={styles.LoginMeioInputs}>
                        <View style={styles.LoginLayoutInputs}>
                            <Text style={styles.LoginLayoutInputsText}>Email</Text>
                            <TextInput
                                style={inputStyleEmail}
                                keyboardType="email-address"
                                placeholder="example@gmail.com"
                                onChangeText={handleEmailChange}
                                value={email}
                                selection={selection}
                                onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
                            />
                        </View>
                        
                        <View style={styles.LoginLayoutInputs}>
                            <Text style={styles.LoginLayoutInputsText}>Senha</Text>
                            <TextInput
                                secureTextEntry={!showPassword}
                                style={[inputStyleSenha, styles.LoginInputSenha]}
                                value={senha}
                                onChangeText={setSenha}
                                placeholderTextColor="gray"
                                placeholder="Insira sua Senha"
                            />
                            <Icon 
                                name={showPassword ? "visibility" : "visibility-off"} 
                                size={24} 
                                color="#000" 
                                style={{ position: 'absolute', top: '65%', right: 15 }} 
                                onPress={handleShowPassword} 
                            />
                        </View>
                    </View>
                    
                    <View style={styles.LoginLayoutMeioBotão}>
                        <TouchableOpacity style={styles.LoginMeioBotão} onPress={handleLogin} disabled={isLoggingIn}>
                            <Text style={styles.LoginMeioBotaoText}>{isLoggingIn ? 'Logando...' : 'Logar'}</Text>
                        </TouchableOpacity>
                        <View style={styles.EsqueceuSenhaLayout}>
                            <Text style={styles.EsqueceuSenhaText} onPress={EsqueceuSenha}>Esqueceu a senha?</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.LoginInferior}>
                    <View style={styles.LoginGoToLogin}>
                        <Text style={styles.LoginTextoGoToLogin}>Não tem uma conta? 
                            <Text style={styles.LoginButtonGoToLogin} onPress={() => navigation.navigate('Cadastro')}> Cadastrar
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.LoginLayoutAuthGoogle}>
                        <Text style={styles.LoginTextAuthGoogle}>Logar com Google:</Text>
                        <Icon name="account-circle" size={30} color="#000" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
