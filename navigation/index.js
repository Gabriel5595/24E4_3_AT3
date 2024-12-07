// navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '../screens/Auth';
import UserInfoScreen from '../screens/UserInfo';
import RepositoriesScreen from '../screens/Repositories';
import IssuesScreen from '../screens/Issues';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
                <Stack.Screen name="Auth" component={AuthScreen} options={{ title: 'Autenticação' }} />
                <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ title: 'Informações do Usuário' }} />
                <Stack.Screen name="Repositories" component={RepositoriesScreen} options={{ title: 'Repositórios' }} />
                <Stack.Screen name="Issues" component={IssuesScreen} options={{ title: 'Issues Atribuídas' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
