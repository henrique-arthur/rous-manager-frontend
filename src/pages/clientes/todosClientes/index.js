import React, { useEffect, useCallback, useState } from 'react';
import {Feather} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';
import styles from './styles';

function ListaComponent(props){
    const navigation = useNavigation();

    function navigateToDetails(id){
        navigation.navigate('DetalhesCliente',{id});
    }

    return(
        <View style={styles.cliente}>
            <TouchableOpacity style={styles.content} onPress={() => {navigateToDetails(props.value.idCliente)}}>
                <View>
                    <Text style={styles.clienteProperty}>Cliente</Text>
                    <Text style={styles.clienteValue}>{props.value.nome}</Text>

                    <Text style={styles.clienteProperty}>Responsável</Text>
                    <Text style={styles.clienteValue}>{props.value.nomeRepresentante}</Text>
                </View>
                <Feather style={styles.icon} name="info" size={28} color="#EB708A"/>
            </TouchableOpacity>
        </View>
    );
}

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function todosClientes(){
    const navigation = useNavigation();
    
    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{paddingHorizontal: 24}} onPress={() =>{navigation.goBack();}}>
                <Feather name="arrow-left" size={28} color="black"/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity style={{paddingHorizontal: 24}} onPress={() =>{navigation.navigate('AdicionarCliente')}}>
                <Feather name="plus" size={28} color="black"/>
            </TouchableOpacity>
        )
    });

    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [texto, setTexto] = useState('Não há clientes cadastrados.');

    useEffect(() =>{
        const loadonscreen = navigation.addListener('focus', () => {
            loadClientes();
            });
        
        return loadonscreen;
    },[navigation]);

    async function loadClientes(){
        if(loading){
            return;
        }
        
        setLoading(true);

        api.get(`cliente/listar/todos`)
        .then((response) => {
            let newArr = [];
            newArr.push(... clientes);
            newArr.push(... response.data);

            setClientes(newArr);
            setLoading(false);
        })
        .catch((e) => {
            setLoading(false);
            if(!e.response){
                setTexto('Erro de conexão (ツ)_/¯');
                return;
            }
            return Alert.alert('Erro', e.response.data.erro);
        });
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setLoading(true);

        api.get(`cliente/listar/todos`)
        .then((response) => {
            let newArr = [];

            newArr.push(... response.data);

            setClientes(newArr);
            setLoading(false);
        })
        .catch((e) => {
            setLoading(false);
            if(!e.response){
                setTexto('Erro de conexão (ツ)_/¯');
                return;
            }
            return Alert.alert('Erro', e.response.data.erro);
        });
        
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return(
        <View style={styles.container}>
            {loading?
            <ActivityIndicator style={{flex: 1,justifyContent:'center', alignSelf:'center'}} size="large" color="#EB708A" />
            :    
            <FlatList
            data={clientes}
            ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>{texto}</Text>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            //onEndReached={loadClientes}
            //onEndReachedThreshold={0.2}            
            //ListFooterComponent={<RenderFooter value={loading} refreshing={refreshing}/>}
            keyExtractor={clientes => String(clientes.idCliente)}
            renderItem={({ item: clientes })=>(
                <ListaComponent value={clientes}/>
            )}/>
            }
        </View>
    );
}

