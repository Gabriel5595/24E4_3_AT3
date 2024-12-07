// screens/UserInfo/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView, Alert, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserInfoScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('github_token');
                const response = await fetch('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar as informações do usuário.');
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return (
            <View style={styles.center}>
                <Text>Carregando informações do usuário...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: user.avatar_url }} style={isPortrait ? styles.avatarPortrait : styles.avatarLandscape} />
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>@{user.login}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
            <View style={isPortrait ? styles.buttonContainerPortrait : styles.buttonContainerLandscape}>
                <Button title="Repositórios" onPress={() => navigation.navigate('Repositories')} />
                <Button title="Issues Atribuídas" onPress={() => navigation.navigate('Issues')} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPortrait: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    avatarLandscape: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    username: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainerPortrait: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'column',
        height: 100,
    },
    buttonContainerLandscape: {
        width: '80%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 50,
    },
});

export default UserInfoScreen;
