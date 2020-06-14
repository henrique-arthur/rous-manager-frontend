import React, { useState, useEffect } from 'react';
import {Feather} from '@expo/vector-icons';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import api from '../../../services/api';

function ListaComponent(props){
    const navigation = useNavigation();
    const route = useRoute();

    let mensalidade = {}
    mensalidade = props.value;
    mensalidade.nome = route.params.nome;

    return(//props.value.dataPagamento
            <TouchableOpacity 
            style={{ marginVertical: 6 }}
            onPress={() => navigation.navigate('DetalhesMensalidade',{mensalidade})
            }>
            <View style={styles.contentList}>
                <Text style={styles.mensalidadeProperty}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.value.valor)}</Text>
                <Text style={
                    props.value.dataPagamento == 'Mensalidade ainda não foi paga.'? 
                    styles.mensalidadeRed
                    : 
                    styles.mensalidadeGreen
                    }>
                    {props.value.dataValidade}</Text>
            </View>
            <View style={{borderTopWidth: 1, borderColor:'#737380', marginTop: 6, marginBottom: 12}}></View>
            </TouchableOpacity>
    );
}

export default function ClienteMensalidade(){
    const navigation = useNavigation();
    const route = useRoute();

    const [loading, setLoading] = useState(false);
    const [mensalidade, setMensalidade] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() =>{
        loadMensalidades();
    },[]);

    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{paddingHorizontal: 24}} onPress={() =>{navigation.goBack();}}>
                <Feather name="arrow-left" size={28} color="black"/>
            </TouchableOpacity>
        )
    });

    async function loadMensalidades(){
        if(loading){
            return;
        }
        setLoading(true);

        const id = route.params.id;

        api.get(`mensalidades/cliente/${id}`)
        .then(response => {

            setMensalidade(response.data);
            setTotal(response.headers['x-total-count']);
            setLoading(false);
        })
        .catch(e => {
            setLoading(false);
            if(!e.response){
                return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
            }
            return Alert.alert('Erro', e.response.data.erro);
        })
    }

    return(
        <View style={styles.container}>
            {loading?
                <ActivityIndicator style={{height: 568, justifyContent:'center', alignSelf:'center'}} size="large" color="#EB708A" />
            :
            <View style={styles.mensalidade}>
                <FlatList
                data={mensalidade.reverse()}
                ListHeaderComponent={<Text style={styles.headerList}>{ `${total} Mensalidades` }</Text>}
                //ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>Nenhuma mensalidade.</Text>}
                //refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                //onEndReached={loadClientes}
                //onEndReachedThreshold={0.2}            
                //ListFooterComponent={<RenderFooter value={loading} refreshing={refreshing}/>}
                showsVerticalScrollIndicator={false}
                keyExtractor={mensalidades => String(mensalidades.idMensalidade)}
                renderItem={({ item: mensalidades })=>(
                    <ListaComponent value={mensalidades}/>
                )}/>
            </View>
            }
        </View>
    );
}