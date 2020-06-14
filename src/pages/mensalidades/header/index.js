import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import style from './styles';

export default function Header(){
  const navigation = useNavigation();
  return(
      <View style={style.container}>
        <View style={style.icons}>
        <TouchableOpacity onPress={()=>{navigation.dispatch(DrawerActions.openDrawer());}} style={style.icon}>
          <Feather name="menu" size={28} color={'#000'}/>
        </TouchableOpacity>

          <Text style={style.text}>Mensalidades</Text>
        </View>
          <TouchableOpacity onPress={()=>{navigation.navigate('AdicionarMensalidade')}} style={style.icon}>
            <Feather name="plus" size={30} color={'#000'}/>
          </TouchableOpacity> 
      </View>
  );
}
