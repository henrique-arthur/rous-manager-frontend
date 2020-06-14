import Routes from './src/routes/index';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';
import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';


export default function App() {
  return (          
      <NavigationContainer>
        <AuthProvider>
        <Routes/>
        </AuthProvider>
      </NavigationContainer>
    
  );
}
