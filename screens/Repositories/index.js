// screens/Repositories/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RepositoryItem from '../../components/RepositoryItem';

const RepositoriesScreen = () => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const token = await AsyncStorage.getItem('github_token');
                const response = await fetch('https://api.github.com/user/repos', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const data = await response.json();
                setRepositories(data);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar os repositórios.');
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (repositories.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Você não faz parte de nenhum repositório.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={repositories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <RepositoryItem repository={item} isPortrait={isPortrait} />}
            contentContainerStyle={styles.list}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RepositoriesScreen;
