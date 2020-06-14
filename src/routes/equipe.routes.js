import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';

const AuthStack = createStackNavigator();

import EquipeComponent from '../pages/equipe';

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator>
            <AuthStack.Screen name="Equipe" component={EquipeComponent}/>
        </AuthStack.Navigator>
    )    
}
