import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    ActivityIndicator, 
    KeyboardAvoidingView, 
    ScrollView, 
    Alert, 
    TextInput 
    } 
    from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import api from '../../../services/api';

export default function adicionarCliente(){
    const navigation = useNavigation();
    const route = useRoute();

    var segundoTextInput = {};
    const [loadBtn, setLoadBtn] = useState(false);
    const [headerTitle, setHeader] = useState('Adicionar Cliente');
    const [id, setId] = useState(-1);
    const [formSender, setFormSender] = useState({
        nome: "",
        telefone: "",
        nomeRepresentante: "",
        rua: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
    });

    navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{paddingHorizontal: 24}} onPress={() =>{navigation.goBack();}}>
                <Feather name="arrow-left" size={28} color="black"/>
            </TouchableOpacity>
        ),
        title: <Text>{headerTitle}</Text>
    });

    useEffect(() => {
        if(typeof route.params !== "undefined"){
            handleEdit();
        }
    },[]);

    function verificarCampos(){
        if(
            formSender.nome == "" ||
            formSender.telefone == "" ||
            formSender.nomeRepresentante == "" ||
            formSender.rua == "" ||
            formSender.bairro == "" ||
            formSender.numero == "" ||
            formSender.cidade == "" ||
            formSender.uf == ""
        )   
            return false;
        else
            return true;
    }

    function sendData(){
        if(loadBtn)
            return;

        if(!verificarCampos())
            return Alert.alert('Erro','Preencha todos os campos.');
        
        setLoadBtn(true);

        api.post('cliente/cadastro',formSender)
        .then(() => {
            Alert.alert('Sucesso','O cliente foi cadastrado.')
            setFormSender({
                nome: "",
                telefone: "",
                nomeRepresentante: "",
                rua: "",
                bairro: "",
                numero: "",
                cidade: "",
                uf: "",
            })
            setLoadBtn(false);
        })
        .catch(e => {
            setLoadBtn(false);
            if(!e.response){
                return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
            }
            if(!e.response.data.erro)
                return Alert.alert(e.response.data.error, e.response.data.message);
            else
                return Alert.alert('Erro',e.response.data.erro);
        });

    }

    function handleEdit(){
        setHeader('Editar Cliente');

        let c = route.params.cliente;

            setId(c.idCliente);

            setFormSender({
                nome: c.nome,
                telefone: c.telefone,
                nomeRepresentante: c.nomeRepresentante,
                rua: c.rua,
                bairro: c.bairro,
                numero: c.numero.toString(),
                cidade: c.cidade,
                uf: c.uf,
            });
    }

    function sendEditData(){
        if(loadBtn)
            return;

        if(!verificarCampos())
            return Alert.alert('Erro','Preencha todos os campos.');
        
        setLoadBtn(true);

        api.put(`cliente/editar/${id}`,formSender)
        .then(() => {
            Alert.alert('Sucesso','Os dados do cliente foram editados.')
            setFormSender({
                nome: "",
                telefone: "",
                nomeRepresentante: "",
                rua: "",
                bairro: "",
                numero: "",
                cidade: "",
                uf: "",
            })
            navigation.goBack();
            setLoadBtn(false);
        })
        .catch(e => {
            setLoadBtn(false);
            if(!e.response){
                return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
            }
            if(!e.response.data.erro)
                return Alert.alert(e.response.data.error, e.response.data.message);
            else
                return Alert.alert('Erro',e.response.data.erro);
        });
    }

  return(
    <ScrollView style={styles.container}>
        <KeyboardAvoidingView style={styles.cliente}>
            <Text style={styles.title}>Cliente</Text>
            <TextInput 
            onChangeText={(nome => setFormSender((prevState) => {
                return { ...prevState, nome }
            }))}
            returnKeyType = { "next" }
            onSubmitEditing={() => { segundoTextInput.focus();}}
            blurOnSubmit={false}
            value={formSender.nome}
            placeholder="Nome do Cliente" 
            placeholderTextColor="#999"
            style={styles.input}>
            </TextInput>
            
            <TextInputMask
            type={'cel-phone'}
            options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
            }}
            value={formSender.telefone}
            onChangeText={(telefone => setFormSender((prevState) => {
                return { ...prevState, telefone }
            }))}
            refInput={(input) => { segundoTextInput = input; }}
            returnKeyType = { "next" }
            onSubmitEditing={() => {terceiroTextInput.focus();}}
            blurOnSubmit={false}
            placeholder="Telefone" 
            placeholderTextColor="#999"
            keyboardType='decimal-pad'
            style={styles.input}
            />

            <TextInput 
            onChangeText={(nomeRepresentante => setFormSender((prevState) => {
                return { ...prevState, nomeRepresentante }
            }))}
            ref={(input) => { terceiroTextInput = input; }}
            returnKeyType = { "next" }
            onSubmitEditing={() => {quartoTextInput.focus();}}
            blurOnSubmit={false}
            value={formSender.nomeRepresentante}
            placeholder="Nome do Responsável" 
            placeholderTextColor="#999"
            style={styles.input}>
            </TextInput>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.title}>Endereço</Text>
                <Feather name="map-pin" size={20} color="#EB708A"/>
            </View>

            <TextInput 
            onChangeText={(rua => setFormSender((prevState) => {
                return { ...prevState, rua }
            }))}
            ref={(input) => { quartoTextInput = input; }}
            returnKeyType = { "next" }
            onSubmitEditing={() => {quintoTextInput.focus();}}
            blurOnSubmit={false}
            value={formSender.rua}
            placeholder="Rua"
            placeholderTextColor="#999"
            style={styles.input}>
            </TextInput>

            <TextInput 
            onChangeText={(numero => setFormSender((prevState) => {
                return { ...prevState, numero }
            }))}
            ref={(input) => { quintoTextInput = input; }}
            returnKeyType = { "next" }
            onSubmitEditing={() => {sextoTextInput.focus();}}
            blurOnSubmit={false}
            value={formSender.numero}
            placeholder="Número"
            placeholderTextColor="#999"
            keyboardType='decimal-pad'
            style={styles.input}>
            </TextInput>

            <TextInput 
            onChangeText={(bairro => setFormSender((prevState) => {
                return { ...prevState, bairro }
            }))}
            ref={(input) => { sextoTextInput = input; }}
            returnKeyType = { "next" }
            onSubmitEditing={() => {setimoTextInput.focus();}}
            blurOnSubmit={false}
            value={formSender.bairro}
            placeholder="Bairro"
            placeholderTextColor="#999"
            style={styles.input}>
            </TextInput>
            
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextInput 
                onChangeText={(cidade => setFormSender((prevState) => {
                    return { ...prevState, cidade }
                }))}
                ref={(input) => { setimoTextInput = input; }}
                returnKeyType = { "next" }
                onSubmitEditing={() => {oitavoTextInput.focus();}}
                blurOnSubmit={false}
                value={formSender.cidade}
                placeholder="Cidade"
                placeholderTextColor="#999"
                style={styles.inputCidade}>
                </TextInput>
                
                <TextInput 
                onChangeText={(uf => setFormSender((prevState) => {
                    return { ...prevState, uf }
                }))}
                ref={(input) => { oitavoTextInput = input; }}
                returnKeyType = { "next" }
                onSubmitEditing={sendData}
                maxLength={2}
                blurOnSubmit={false}
                value={formSender.uf}
                placeholder="UF"
                placeholderTextColor="#999"
                style={styles.inputUf}>
                </TextInput>
            </View>
        </KeyboardAvoidingView>

        <View style={styles.bottom}>
            <TouchableOpacity  
            onPress={id == -1? sendData : sendEditData} 
            style={styles.salvar}>   
            {(!loadBtn) ? <Text style={styles.txtSalvar}>Salvar</Text> : <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
            </TouchableOpacity>          
        </View>
    </ScrollView>
  );
}

