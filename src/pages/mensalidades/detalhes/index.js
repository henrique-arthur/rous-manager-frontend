import React, {useState} from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, ScrollView, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import styles from './styles';

import api from '../../../services/api';

export default function detalhes(){
    const [loadIndicator, setLoadIndicator] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const mensalidade = route.params.mensalidade;

    function pagarMensalidade(id){
        if(mensalidade.dataPagamento != 'Mensalidade ainda não foi paga.'){
            Alert.alert('Erro', 'Esta mensalidade já foi paga.');
        }else{
            Alert.alert(
                'Atenção',
                'Deseja realmente pagar esta mensalidade?',
                [
                    {
                        text: 'Sim',
                        style: 'destructive',
                        onPress: () => {
                            setLoadIndicator(true);
                            api.post(`mensalidades/${id}/1`)
                        .then(() => {
                            setLoadIndicator(false);
                            Alert.alert('Sucesso', 'A mensalidade foi paga.')
                            navigation.goBack()
                        })
                        .catch(function (error){
                            setLoadIndicator(false);
                            if(!e.response){
                                return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
                            }
                            return Alert.alert('Erro',error.response.data.erro);
        
                        })
                    }},
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    }
                ],
                { cancelable: false })
            }
        }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{navigation.goBack();}}><Feather name="arrow-left" size={28} color="black"/></TouchableOpacity>
            <Text style={styles.headerText}>Mensalidade</Text>
        </View>
        <ScrollView>
        <View style={styles.mensalidade}>
            <Text style={styles.mensalidadeProperty}>Cliente</Text>
            <Text style={styles.mensalidadeValue}>{mensalidade.nome}</Text>

            <Text style={styles.mensalidadeProperty}>Data do Pagamento</Text>
            <Text style={styles.mensalidadeValue}>{mensalidade.dataPagamento}</Text>

            <Text style={styles.mensalidadeProperty}>Data do Vencimento</Text>
            <Text style={styles.mensalidadeValue}>{mensalidade.dataValidade}</Text>

            <Text style={styles.mensalidadeProperty}>Valor</Text>
            <Text style={styles.valorValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(mensalidade.valor)}</Text>
        </View> 
        </ScrollView>
        <View style={styles.bottom}>
            <TouchableOpacity  
            onPress={()=> pagarMensalidade(mensalidade.idMensalidade)} 
            style={styles.pagar}>   
            {!loadIndicator ?
              <Text style={styles.txtpagar}>Pagar</Text>
              : 
              <ActivityIndicator style={styles.loader} size="large" color="#fff" />
            }
            </TouchableOpacity>          
        </View>
    </View>
  );
}
