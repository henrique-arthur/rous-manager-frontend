import { createContext, useState, useEffect, useContext } from 'react';
import {AsyncStorage} from 'react-native';
import React from 'react';
const AuthContext = createContext();

export function useAuthentication(){
    const Authentication = useContext(AuthContext);
    if(!Authentication) throw new Error ("Aplicação sem contexto");
    const { 
        authLogin, 
        authLogoff, 
        checkAuthState, 
        estaLogado, 
        setEstaLogado, 
        idUser, 
        setIdUser, 
        appLoaded, 
        setAppLoaded,
        username
    } = Authentication;

    return { 
        authLogin, 
        authLogoff, 
        checkAuthState, 
        estaLogado, 
        setEstaLogado, 
        idUser, 
        setIdUser, 
        appLoaded, 
        setAppLoaded,
        username
    };
}

export default function AuthProvider({ children }){
    const [estaLogado, setEstaLogado] = useState(false);
    const [appLoaded, setAppLoaded] = useState(false);
    const [idUser, setIdUser] = useState('');
    const [username, setUsername] = useState('');
    
    useEffect(()=>{
        checkAuthState();
    },[estaLogado]);

    function authLogin(id, username){
        AsyncStorage.setItem('@RousManager:id',id)
        .then((response) =>{
        setEstaLogado(true);
        setIdUser(response);
        })
        .catch((e) => { console.log('ERROR NO ASYNCSTORAGE DO AUTHLOGIN TRUE'+e)});

        AsyncStorage.setItem('@RousManager:username',username)
        .then((response) =>{
        setUsername(response);
        })
        .catch((e) => { console.log('ERROR NO ASYNCSTORAGE DO AUTHLOGIN TRUE'+e)});
        return true;
    }

    function authLogoff(){

        AsyncStorage.removeItem('@RousManager:id')
        .then(() => {
            setEstaLogado(false);
            setIdUser('');
            return true;
        }).catch((e) => { console.log('ERROR NO ASYNCSTORAGE DO AUTHLOGIN FALSE'+e)});

        AsyncStorage.removeItem('@RousManager:username')
        .then(() => {
            setUsername('');
        }).catch((e) => { console.log('ERROR NO ASYNCSTORAGE DO AUTHLOGIN FALSE'+e)});
        
    }

    function checkAuthState(){
        
        AsyncStorage.getItem('@RousManager:id')
        .then(user => {
            if(user){
                setIdUser(user);
                setEstaLogado(true);
                setAppLoaded(true);
                console.log('checkAuthState running with a user: '+user);
            }else{
                setIdUser('');
                setAppLoaded(true);
                setEstaLogado(false);

                console.log('checkAuthState running running without a user');
            }
        });

        AsyncStorage.getItem('@RousManager:username')
        .then(username => {
            if(username){
                setUsername(username);
                setEstaLogado(true);
                setAppLoaded(true);
            }else{
                setUsername('');

                setAppLoaded(true);
                setEstaLogado(false);
            }
        });
    }

    return(
        <AuthContext.Provider value={{
            authLogin,
            authLogoff,
            checkAuthState,
            estaLogado,
            idUser,
            appLoaded,
            setAppLoaded,
            username,
        }}>
            {children}
        </AuthContext.Provider>
    );
}