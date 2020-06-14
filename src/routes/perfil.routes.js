import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

const AuthStack = createStackNavigator();

import EquipeComponent from '../pages/perfil';

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Perfil" component={EquipeComponent}/>
        </AuthStack.Navigator>
    )    
}
