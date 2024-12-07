// screens/Issues/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IssueItem from '../../components/IssueItem';

const IssuesScreen = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const { width, height } = useWindowDimensions();
    const isPortrait = height >= width;

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = await AsyncStorage.getItem('github_token');
                const response = await fetch('https://api.github.com/issues', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });
                const data = await response.json();
                setIssues(data);
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível buscar as issues.');
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (issues.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Você não tem issues atribuídas.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={issues}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <IssueItem issue={item} isPortrait={isPortrait} />}
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

export default IssuesScreen;
