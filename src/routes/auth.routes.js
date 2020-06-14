import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

const AuthStack = createStackNavigator();

import LoginComponent from '../pages/AuthPages/login';
import CadastroComponent from '../pages/AuthPages/cadastro';

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator screenOptions={{headerShown: false}}>
            <AuthStack.Screen name="Login"  component={LoginComponent}/>  
            <AuthStack.Screen name="Cadastro" component={CadastroComponent}/>
        </AuthStack.Navigator>
    )    
}
