// components/IssueItem/index.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const IssueItem = ({ issue, isPortrait }) => {
    // Extrair o nome do repositório a partir da URL
    const repoName = issue.repository_url
        ? issue.repository_url.split('/').slice(-2).join('/')
        : 'Repositório não especificado';

    return (
        <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
            <Text style={styles.title}>{issue.title}</Text>
            <Text style={styles.repo}>Repositório: {repoName}</Text>
            <Text style={styles.status}>Status: {issue.state}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#eef',
        borderRadius: 5,
        elevation: 1,
    },
    portrait: {
        width: '100%',
    },
    landscape: {
        width: '48%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    repo: {
        marginTop: 5,
        fontSize: 14,
        color: '#555',
    },
    status: {
        marginTop: 5,
        fontSize: 12,
        color: '#888',
    },
});

export default IssueItem;
