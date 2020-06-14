import {
    View, Image, Text, TextInput, TouchableOpacity, 
    Alert, KeyboardAvoidingView, ScrollView, 
    ActivityIndicator}
    from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from '../../../contexts/auth';
import * as SplashScreen from 'expo-splash-screen';

import api from '../../../services/api';
import logoImg from '../../../assets/bearBig.png'

SplashScreen.preventAutoHideAsync();

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function login (){
    const navigation = useNavigation();
    const { authLogin } = useAuthentication();

    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [incorrect, setIncorrect] = useState('');

    var segundoTextInput = {};

    useEffect(() => {
        wait(1000).then(() => hideSplash());
    },[]);

    async function hideSplash(){
        await SplashScreen.hideAsync();
    }

    async function logar(usuario,senha){
        var req = {usuario:usuario,senha:senha};
        var logou = false;
            if(req.usuario == "" || req.senha ==""){
                Alert.alert('Erro',"Preencha os campos vazios.");
            }else{
                setLoading(true);
                api.post('usuario/login',req)
                .then((response) => {
                    const _id = response.data.id.toString();
                    const _nome = response.data.nome.toString();
                    setIncorrect('');
                    console.log(response.data)
                    authLogin(_id, _nome);

                    logou = true;
                    
                })
                .catch(function (error){                    
                    if (error.response) {
                        setLoading(false);
                        if(error.response.status == 404){
                            setIncorrect('');
                            setInterval(() => {setIncorrect('Usuário ou senha incorretos.');},500);
                        }else{
                            Alert.alert('Erro',error.response.data.erro);
                        }
                    }else{
                        setLoading(false);
                        return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
                    }
                })
                if(logou){
                    setLoading(false);
                    navigation.navigate('Menu');
                }
            }
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.bear}>
                <Image source={logoImg} style={{width: 100, height: 100, marginBottom: 10, marginTop: 25}}/>
            </View>
            <KeyboardAvoidingView behavior="padding" style={styles.form}>
                <Text style={styles.headerText}>Login</Text>
                <TextInput
                onChangeText={(usuario => setUsuario(usuario))}

                returnKeyType = { "next" }
                onSubmitEditing={() => { segundoTextInput.focus(); }}
                blurOnSubmit={false}

                autoCapitalize="none"
                placeholderTextColor="#999"
                placeholder="Usuário" style={styles.input}>
                </TextInput>

                <TextInput
                onChangeText={(senha => setSenha(senha))}

                ref={(input) => { segundoTextInput = input; }}

                autoCapitalize="none"
                placeholder="Senha" secureTextEntry={true}
                placeholderTextColor="#999"
                style={styles.input}>
                </TextInput>

                <Text style={styles.incorretLogin}>{incorrect}</Text>

                <TouchableOpacity 
                onPress={()=>{(logar(usuario,senha))}}
                style={styles.login}>
                
                {!loading ? <Text style={styles.txtlogin}>Login</Text>  : <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
                </TouchableOpacity>

                <TouchableOpacity  
                onPress={()=>{navigation.navigate('Cadastro');}} 
                style={styles.cadastro}>
                <Text style={styles.txtcadastro}>Cadastro</Text>
                </TouchableOpacity>          
            </KeyboardAvoidingView>
        </ScrollView>
    )
}