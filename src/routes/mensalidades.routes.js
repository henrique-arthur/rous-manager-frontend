import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import {
  todasComponent, 
  proximasComponent, 
  atrasadasComponent, 
  pagasComponent,
  optionsComponent,
} 
  from '../pages/mensalidades';

const Tab = createMaterialTopTabNavigator();

export default function MensalidadesRoutes() {
  return (
    <Tab.Navigator tabBarOptions={optionsComponent} initialRouteName="Todas">
      <Tab.Screen name="Todas" options={{swipeEnabled:true}} component={todasComponent}/>
      <Tab.Screen name="Proximas" options={{swipeEnabled:false}} component={proximasComponent}/>
      <Tab.Screen name="Pagas" options={{swipeEnabled:false}} component={pagasComponent}/>
      <Tab.Screen name="Atrasadas" options={{swipeEnabled:false}} component={atrasadasComponent}/>
    </Tab.Navigator>
  );
}