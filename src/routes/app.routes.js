import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

const Drawer = createDrawerNavigator();

import MenuRoutes from './menu.routes';
import ClientesRoutes from './clientes.routes';
import EquipeRoutes from './equipe.routes';
import PerfilRoutes from './perfil.routes';
import DetalhesMensalidadeComponent from '../pages/mensalidades/detalhes';
import AdicionarMensalidadeComponent from '../pages/mensalidades/adicionar';
import DrawerContent from '../components/drawer/drawerContent.js';

export default function AppRoutes() {
  const drawerScreen = props => <DrawerContent {...props}/> 

  return (
    <Drawer.Navigator drawerContent={drawerScreen} initialRouteName="Mensalidades">
      <Drawer.Screen name="Perfil" options={{swipeEnabled:false}} component={PerfilRoutes}/>
      <Drawer.Screen name="Mensalidades" component={MenuRoutes}/>
      <Drawer.Screen name="Clientes" options={{swipeEnabled:false}} component={ClientesRoutes}/>
      <Drawer.Screen name="Equipe" options={{swipeEnabled:false}} component={EquipeRoutes}/>
      <Drawer.Screen name="AdicionarMensalidade" options={{swipeEnabled:false}} component={AdicionarMensalidadeComponent}/>
      <Drawer.Screen name="DetalhesMensalidade" options={{swipeEnabled: false}} component={DetalhesMensalidadeComponent}/>
    </Drawer.Navigator>
  );
}
