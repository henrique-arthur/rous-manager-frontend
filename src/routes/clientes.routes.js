import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from 'react-native';

const ClienteStack = createStackNavigator();

import TodosClientes from '../pages/clientes/todosClientes';
import DetalhesCliente from '../pages/clientes/detalhes';
import ClienteMensalidade from '../pages/clientes/clienteMensalidade';
import AdicionarCliente from '../pages/clientes/adicionarCliente';

export default function ClienteRoutes(){
    return(
        <ClienteStack.Navigator>
            <ClienteStack.Screen 
            name="Clientes" 
            component={TodosClientes} 
            options={({navigation, route}) => ({
                headerLeft: props => <TouchableOpacity {... props}/>,
                headerRight: props => <TouchableOpacity {... props}/>
            })}/>
            <ClienteStack.Screen 
            name="DetalhesCliente" 
            component={DetalhesCliente} 
            options={({navigation, route}) => ({
                headerLeft: props => <TouchableOpacity {... props}/>,
                title: 'Cliente'
            })}/>
            <ClienteStack.Screen 
            name="ClienteMensalidade" 
            component={ClienteMensalidade} 
            options={({navigation, route}) => ({
                headerLeft: props => <TouchableOpacity {... props}/>,
                title: route.params.nome
            })}/>
            <ClienteStack.Screen 
            name="AdicionarCliente" 
            component={AdicionarCliente} 
            options={({navigation, route}) => ({
                headerLeft: props => <TouchableOpacity {... props}/>,
                title: props => <Text {... props}/> 
            })}/>
        </ClienteStack.Navigator>
    )    
}
