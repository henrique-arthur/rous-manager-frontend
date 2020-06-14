import React, {useState} from 'react';
import {Feather} from '@expo/vector-icons'
import {View, Text, TouchableOpacity, TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator} 
from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import api from '../../../services/api';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function cadastro(){
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [confirmsenha, setConfirmsenha] = useState('');
    const [formSender, setFormSender] = useState({
        nome:"",
        user:"",
        nascimento:"",
        email:"",
        usersenha:"",
        chave:"",
    });

    async function cadastrar(formSender, confirmsenha){
        if(formSender.nome =="" ||
        formSender.user == "" ||
        formSender.nascimento == "" ||
        formSender.email == "" ||
        formSender.usersenha == "" ||
        formSender.chave== "" ||
        confirmsenha == ""
        ){
            Alert.alert('Erro',"Preencha os campos vazios.");
        }
        else{
            if(formSender.usersenha === confirmsenha){
                setLoading(true);
                api.post('usuario/cadastro',formSender)
                .then(() => {
                    setLoading(false);
                    Alert.alert(
                        'Sucesso',
                        'Cadastro realizado.',
                        [{
                            text: 'Continuar',
                            onPress: () => navigation.navigate('Login')
                        }],
                        { cancelable: false })
                    setIncorrect('');
                })
                .catch(e => {
                    setLoading(false);
                    if (e.response){
                        if(e.response.data.erro)
                            return Alert.alert('Erro',e.response.data.erro);
                        else
                            return Alert.alert(e.response.data.error,e.response.data.message);  
                    }
               })
                

            }else{
                Alert.alert('Erro','As senhas digitadas não correspondem.');
            }
        }
    }


    return(
        <View style={styles.container}> 
                <View style={styles.header}>
                    <TouchableOpacity onPress={()=>{navigation.goBack();}}><Feather name="arrow-left" size={28} color="black"/></TouchableOpacity>
                    <Text style={styles.headerText}>Cadastro</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView behavior="padding">
                        <TextInput 
                        onChangeText={(nome => setFormSender((prevState) => {
                            return { ...prevState, nome }
                        }))}

                        returnKeyType = { "next" }
                        onSubmitEditing={() => { segundoTextInput.focus();}}
                        blurOnSubmit={false}

                        placeholder="Nome" 
                        placeholderTextColor="#999"
                        style={styles.input}>
                        </TextInput>
                        
                        <TextInput 
                        onChangeText={(user => setFormSender((prevState) => {
                            return { ...prevState, user }
                        }))}

                        ref={(input) => { segundoTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => {terceiroTextInput.focus();}}
                        blurOnSubmit={false}

                        autoCapitalize="none" 
                        placeholder="Usuário" 
                        placeholderTextColor="#999"
                        style={styles.input}>
                        </TextInput>
                        
                        <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={formSender.nascimento}
                        onChangeText={(nascimento => setFormSender((prevState) => {
                            return { ...prevState, nascimento }
                        }))}
                         
                        refInput={(input) => { terceiroTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { quartoTextInput.focus();}}
                        blurOnSubmit={false}

                        autoCapitalize="none"
                        placeholder="Data de Nascimento"
                        placeholderTextColor="#999"
                        style={styles.input}
                        />

                        <TextInput 
                        onChangeText={(email => setFormSender((prevState) => {
                            return { ...prevState, email }
                        }))}

                        ref={(input) => { quartoTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { quintoTextInput.focus();}}
                        blurOnSubmit={false}

                        placeholder="E-mail" 
                        placeholderTextColor="#999"
                        keyboardType="email-address" 
                        style={styles.input}>
                        </TextInput>

                        <TextInput
                        onChangeText={(usersenha => setFormSender((prevState) => {
                            return { ...prevState, usersenha }
                        }))}

                        ref={(input) => { quintoTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { sextoTextInput.focus();}}
                        blurOnSubmit={false}

                        placeholder="Senha" 
                        placeholderTextColor="#999"
                        secureTextEntry={true} 
                        style={styles.input}>
                        </TextInput>

                        <TextInput 
                        onChangeText={(confirmsenha => setConfirmsenha(confirmsenha))}

                        ref={(input) => { sextoTextInput = input; }}
                        returnKeyType = { "next" }
                        onSubmitEditing={() => { setimoTextInput.focus();}}
                        blurOnSubmit={false}

                        secureTextEntry={true}
                        placeholder="Confirme sua senha" 
                        placeholderTextColor="#999"
                        style={styles.input}>
                        </TextInput>

                        <TextInput 
                        onChangeText={(chave => setFormSender((prevState) => {
                            return { ...prevState, chave }
                        }))}

                        ref={(input) => { setimoTextInput = input; }}

                        autoCapitalize="none" 
                        placeholder="Token"
                        placeholderTextColor="#999"
                        secureTextEntry={true} 
                        style={styles.input}>
                        </TextInput>

                    </KeyboardAvoidingView>
                 
            <View style={styles.bottom}>
                <TouchableOpacity  
                onPress={()=>{cadastrar(formSender, confirmsenha)}} 
                style={styles.cadastro}>   
                {!loading ? <Text style={styles.txtcadastro}>Cadastrar</Text> : <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
                </TouchableOpacity>          
            </View>
            </ScrollView>
        </View>
    )
}