// screens/Auth/index.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({ navigation }) => {
    const [token, setToken] = useState('');

    const handleLogin = async () => {
        if (token.trim() === '') {
            Alert.alert('Erro', 'Por favor, insira um token válido.');
            return;
        }

        try {
            await AsyncStorage.setItem('github_token', token);
            navigation.navigate('UserInfo');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível armazenar o token.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Text style={styles.title}>Autenticação GitHub</Text>
            <TextInput
                style={styles.input}
                placeholder="Insira seu token do GitHub"
                value={token}
                onChangeText={setToken}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default AuthScreen;
