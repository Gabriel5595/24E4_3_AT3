// components/RepositoryItem/index.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RepositoryItem = ({ repository, isPortrait }) => {
    return (
        <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
            <Text style={styles.name}>{repository.name}</Text>
            <Text style={styles.description}>{repository.description || 'Sem descrição'}</Text>
            <Text style={styles.language}>{repository.language || 'Linguagem não especificada'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        elevation: 2,
    },
    portrait: {
        width: '100%',
    },
    landscape: {
        width: '48%',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
    language: {
        marginTop: 10,
        fontSize: 12,
        color: '#888',
    },
});

export default RepositoryItem;
