import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import api from '../../../services/api';

export default function Detalhesclientes(){
    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [loadIndicator, setLoadIndicator] = useState(false);
    const [cliente, setCliente] = useState({});

    useEffect(() =>{
        const loadonscreen = navigation.addListener('focus', () => {
            loadCliente();
            });
        
        return loadonscreen;
    },[navigation]);

    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{paddingHorizontal: 24}} onPress={() =>{navigation.goBack();}}>
                <Feather name="arrow-left" size={28} color="black"/>
            </TouchableOpacity>
        )
    });

    async function loadCliente(){
        if(loading) return;

        setLoading(true);

        let id = route.params.id;

        api.get(`cliente/listar/${id}`)
        .then(response => {

            setCliente(response.data);
            
            setLoading(false);
        })
        .catch(e => {
            setLoading(false);
            Alert.alert('Erro', e.response.data.erro);
            navigation.goBack();
        })
    }

    function navigateToMensalidade(){
        let id = route.params.id;
        let nome = cliente.nome;
        if(id){
            navigation.navigate('ClienteMensalidade', {id, nome});
        }else{
            Alert.alert('Erro','houve um problema ao carregar as mensalidades deste cliente.');
        }
    }

    function chamarExcluir(){
        Alert.alert(
            'Atenção',
            `Deseja realmente excluir o cliente ${cliente.nome}?\nSe o cliente possuir algum contrato ele será fechado.`,
            [{
                text: 'Sim',
                onPress: () => excluirCliente()
            },
            {
                text: 'Não',
            }],
            { cancelable: false })
    }

    async function excluirCliente(){
        if(loading){
            return;
        }
        setLoading(true);

        const id = route.params.id;

        api.put(`cliente/excluir/${id}`)
        .then(response => {

            Alert.alert(
                'Sucesso',
                'Cliente excluído.',
                [{
                    text: 'Continuar',
                    onPress: () => navigation.goBack()
                }],
                { cancelable: false })
                
            setLoading(false);
        })
        .catch(e => {
            setLoading(false);
            if(!e.response){
                Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
                return;
            }
            return Alert.alert('Erro', e.response.data.erro);
        })
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.cliente}>
                {loading?
                <ActivityIndicator style={{height: 568, justifyContent:'center', alignSelf:'center'}} size="large" color="#EB708A" />
                :
                <>
                <View style={styles.btnContainer}>
                    <Text style={styles.clienteProperty}>Cliente</Text>
                    <View style={styles.touchContainer}>
                        <TouchableOpacity onPress={()=> { navigation.navigate('AdicionarCliente', {cliente:cliente}) }}>
                            <Feather style={{padding: 3}} name="edit-2" size={18} color="#737380"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={chamarExcluir}>
                            <Feather style={{marginLeft: 20, padding: 3}} name="trash-2" size={18} color="#737380"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.clienteValue}>{cliente.nome}</Text>
                
                <Text style={styles.clienteProperty}>Responsável</Text>
                <Text style={styles.clienteValue}>{cliente.nomeRepresentante}</Text>
                
                <Text style={styles.clienteProperty}>Telefone</Text>
                <Text style={styles.clienteValue}>{cliente.telefone}</Text>
                
                <Text style={styles.clienteProperty}>Endereço</Text>
                <Text style={styles.clienteValue}>{cliente.rua +', '+cliente.bairro+', '+cliente.numero+', '+cliente.cidade+', '+cliente.uf}</Text>
                
                <Text style={styles.clienteProperty}>Produto</Text>
                <Text style={styles.clienteValue}>{cliente.produto}</Text> 

                <Text style={styles.clienteProperty}>Valor</Text>
                <Text style={styles.clienteValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(cliente.valorContrato)}</Text>
                
                <Text style={styles.clienteProperty}>Data do Início</Text>
                <Text style={styles.clienteValue}>{cliente.dataInicio}</Text>
                
                <Text style={styles.clienteProperty}>Término do Contrato</Text>
                <Text style={styles.clienteValue}>{cliente.terminoContrato}</Text>
                </>
                }
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity  
                onPress={() => navigateToMensalidade()} 
                style={styles.btnmens}>   
                {!loadIndicator ?
                    <View style={styles.textcenter}>                    
                        <Feather style={{marginLeft: 20}} name="dollar-sign" size={24} color="#fff"/>
                        <Text style={styles.txtmens}>Visualizar Mensalidades</Text>
                    </View>
                : 
                    <ActivityIndicator style={styles.loader} size="large" color="#fff" />
                }
                </TouchableOpacity>         
            </View>
        </ScrollView>
    );
}