import React from 'react';
import {View} from 'react-native';

import MensalidadesComponent from './mensalidades.routes';
import MensalidadesHeader from '../pages/mensalidades/header';

export default function MenuRoutes() {
  return (
    <View style={{flex:1}}>
    <MensalidadesHeader/>
    <MensalidadesComponent/>
    </View>
  );
}

