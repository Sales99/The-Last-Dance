import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import styles from "./CadastroCSS";
// import ImagemTopoCadastro from "../../../Image/Mulher_Abrindo_Porta_Prime.png";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import firebaseConfig from '../../../data/firebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, getReactNativePersistence } from 'firebase/auth';

import CadastroCarregamento from '../../TelaCarregamento';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
    const navigation = useNavigation(); 
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [confirmSenha, setConfirmSenha] = useState('');
    const [invalidConfirmSenha, setInvalidConfirmSenha] = useState(false);
    const [invalidSenha, setInvalidSenha] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [isCadastroIn, setIsCadastroIn] = useState(false);
    const [erro, setErro] = useState(null);

    const handleEmailChange = (text) => {
        let newText = text;
        let newSelection = selection;

        if (newText === '') {
            setEmail('');
            setInvalidEmail(false);
            newSelection = { start: 0, end: 0 };
        } else if (newText.startsWith('@')) {
            setInvalidEmail(true);
            setEmail('');
            newSelection = { start: 0, end: 0 };
        } else if (newText.includes('@gmail.com')) {
            const domainPart = newText.split('@gmail.com')[1];
            if (domainPart === '') {
                setEmail(newText);
                setInvalidEmail(false);
            } else {
                setEmail(newText);
                setInvalidEmail(true);
            }
        } else if (newText.includes('@')) {
            setInvalidEmail(true);
            setEmail(newText);
        } else {
            newText = newText + '@gmail.com';
            setEmail(newText);
            newSelection = { start: text.length, end: text.length };
        }

        setSelection(newSelection);
    };

    const inputStyleEmail = email === ''
        ? styles.CadastroInputSemValor
        : email.includes('@gmail.com') && !invalidEmail
        ? styles.CadastroInputComValor
        : styles.CadastroInputComValorInvalido;

    const inputStyleSenha = senha
        ? invalidSenha ? styles.CadastroInputComValorInvalido : styles.CadastroInputComValor
        : styles.CadastroInputSemValor;
    
    const inputStyleConfirmSenha = confirmSenha
        ? invalidConfirmSenha ? styles.CadastroInputComValorInvalido : styles.CadastroInputComValor
        : styles.CadastroInputSemValor;

    const handleSenhaChange = (text) => {
        setSenha(text);
        if (text.length < 6) {
            setInvalidSenha(true);
        } else {
            setInvalidSenha(false);
        }
    };

    const handleConfirmSenhaChange = (text) => {
        setConfirmSenha(text);
        if (text !== senha) {
            setInvalidConfirmSenha(true);
        } else {
            setInvalidConfirmSenha(false);
        }
    };

    useEffect(() => {
        if (confirmSenha !== '' && confirmSenha !== senha) {
            setInvalidConfirmSenha(true);
        } else {
            setInvalidConfirmSenha(false);
        }
    }, [senha, confirmSenha]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp, {
        persistence: getReactNativePersistence(AsyncStorage)
    });

    const handleCreateUser = async () => {
        setIsCadastroIn(true);

        if (!email || !senha || !confirmSenha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            setIsCadastroIn(false);
            return;
        }

        if (invalidEmail || invalidConfirmSenha) {
            Alert.alert('Erro', 'Verifique os campos de email e senha');
            setIsCadastroIn(false);
            return;
        }

        if (senha.length < 6) {
            Alert.alert('Erro', 'Senha fraca. A senha deve ter pelo menos 6 caracteres');
            setIsCadastroIn(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            Alert.alert('Usuário criado com sucesso', `Email: ${user.email}`);
            setIsCadastroIn(false);
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', `Erro ao criar usuário: ${error.message}`);
            setIsCadastroIn(false);
        }
    };

    return (
        <SafeAreaView style={styles.ConfigContainerCadastro}>
            <ScrollView style={styles.containerCadastro}>
                <View style={styles.cadastroTopo}>
                    <View style={styles.cadastroTopoImagem}>
                        <Image
                            source={ImagemTopoCadastro}
                            style={styles.CadastroImage}
                        />
                    </View>
                    <View style={styles.CadastroTopoTitulo}>
                        <Text style={styles.CadastroTopoTituloText}>Cadastro</Text>
                    </View>
                </View>
                <View style={styles.CadastroMeio}>
                    <View style={styles.CadastroMeioInputs}>
                        <View style={styles.CadastroLayoutInputs}>
                            <Text style={styles.CadastroLayoutInputsText}>Email</Text>
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
                        <View style={styles.CadastroLayoutInputs}>
                            <Text style={styles.CadastroLayoutInputsText}>Senha</Text>
                            <TextInput
                                secureTextEntry={!showPassword}
                                style={[inputStyleSenha, styles.CadastroInputSenha]}
                                value={senha}
                                onChangeText={handleSenhaChange}
                                placeholderTextColor="gray"
                                placeholder="Insira sua Senha"
                            />
                            <Icon name={showPassword ? "visibility" : "visibility-off"} size={24} color="#000" style={{ position: 'absolute', top: '65%', right: 15 }} onPress={handleShowPassword} />
                        </View>
                        <View style={styles.CadastroLayoutInputs}>
                            <Text style={styles.CadastroLayoutInputsText}>Confirme sua senha</Text>
                            <TextInput
                                secureTextEntry={!showConfirmPassword}
                                style={[inputStyleConfirmSenha, styles.CadastroInputConfirmaSenha]}
                                value={confirmSenha}
                                onChangeText={handleConfirmSenhaChange}
                                placeholder="Confirme sua senha"
                            />
                            <Icon name={showConfirmPassword ? "visibility" : "visibility-off"} size={24} color="#000" style={{ position: 'absolute', top: '65%', right: 15 }} onPress={handleShowConfirmPassword} />
                        </View>
                    </View>
                    <View style={styles.CadastroLayoutMeioBotão}>
                        <TouchableOpacity style={styles.CadastroMeioBotão} onPress={handleCreateUser} disabled={isCadastroIn}>
                            <Text style={styles.CadastroMeioBotaoText}>{isCadastroIn ? 'Cadastrando...' : 'Cadastrar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.CadastroInferior}>
                    <View style={styles.CadastroGoToLogin}>
                        <Text style={styles.CadastroTextoGoToLogin}>Já tem uma conta? <Text style={styles.CadastroButtonGoToLogin} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
                    </View>
                    <View style={styles.CadastroLayoutAuthGoogle}>
                        <Text style={styles.CadastroTextAuthGoogle}>Logar com Google:</Text>
                        <Icon name="account-circle" size={30} color="#000"/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
