import React from 'react';
import Constants from 'expo-constants';
import { Avatar } from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuthentication } from '../../contexts/auth';

import user from '../../assets/user.png';
import bear from '../../assets/bear.png';
// import axios from 'axios';
// import { Container } from './styles';

export default function DrawerContent({navigation}){
    const { username, authLogoff } = useAuthentication();
    
  return (
      <View style={styles.container}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Perfil')}}>
                    <Avatar 
                    rounded
                    size='medium' 
                    title='RS'
                    titleStyle={{color:'#000'}}
                    source={user}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.profileNameText}>{`<${username}/>`}</Text>
          </View>
          
        <View style={styles.menu}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Clientes')}} style={styles.btnMenu}>
                <Feather name="users" size={24} color="#000"/>
                <Text style={styles.btnText}>Clientes</Text>
            </TouchableOpacity> 
                <TouchableOpacity onPress={()=>{navigation.navigate('Equipe')}} style={styles.btnMenu}>
                <Feather name="code" size={24} color="#000"/>                
                <Text style={styles.btnText}>Equipe</Text>
            </TouchableOpacity> 
        </View>
        <View style={styles.rousContainer}>
            <View style={styles.rousContent}>
                <View style={styles.rousContent}>
                    <Image source={bear} style={styles.rousImg}/>
                    <Text style={styles.rousText}>
                        ROUS Sistemas
                    </Text>
                </View>
                <TouchableOpacity style={{right: 0}} onPress={authLogoff}>
                    <Feather name="log-out" size={28} color="#000"/>
                </TouchableOpacity>
            </View>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#fff',
        paddingBottom: 8,
    },
    profile:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        marginBottom: 64,
    },
    avatar:{
       alignItems:'center',
       marginRight: 16,
    },
    profileNameText:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf:'center',
    },
    line:{
        height: 1,
        backgroundColor:'#999',
        marginTop: 16,
        marginBottom: 64,
    },
    menu:{
        paddingHorizontal: 15,
    },
    btnMenu:{
        marginBottom: 36,
        padding: 10,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    btnText:{
        fontFamily: 'Roboto',
        fontSize: 20,
        marginLeft: 36,
    },
    rousContainer:{
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    rousContent:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
    },
    rousImg:{
        height: 45,
        width: 45,
    },
    rousText:{
        fontFamily: 'Roboto',
        fontWeight: '100',
        fontSize: 12,
        marginLeft: 16,
    }

});

