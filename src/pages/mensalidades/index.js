import {View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {Feather} from '@expo/vector-icons';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

//import { TabView, SceneMap } from 'react-native-tab-view';
// import Animated from 'react-native-reanimated';

import api from '../../services/api';

SplashScreen.preventAutoHideAsync();

export const optionsComponent = {
        activeTintColor: '#EB708A',
        inactiveTintColor: '#000',
        indicatorStyle: {
            activeTintColor: '#EB708A',
        },
        labelStyle:{
            fontSize: 10,
        },
}

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

function RenderFooter({value, refreshing, error}){
    if(!value) return null;
    if(refreshing) return null;
    if(error) return null;
    return(
        <ActivityIndicator style={{alignSelf:'center', margin: 15}} color={'#999'} size={"small"} />
    );
}

const ListaComponent = React.memo(function ListaComponent(props){
    const navigation = useNavigation();

    function navigateToDetails(mensalidade){
        navigation.navigate('DetalhesMensalidade',{mensalidade});
    }

    return(
        <View style={styles.mensalidade}>
            <Text style={styles.mensalidadeProperty}>Cliente</Text>
            <Text style={styles.mensalidadeValue}>{props.value.nome}</Text>

            <Text style={styles.mensalidadeProperty}>Data do Pagamento</Text>
            <Text style={styles.mensalidadeValue}>{props.value.dataPagamento}</Text>

            <Text style={styles.mensalidadeProperty}>Data do Vencimento</Text>
            <Text style={props.styleMensalidade}>{props.value.dataValidade}</Text>

            <Text style={styles.mensalidadeProperty}>Valor</Text>
            <Text style={styles.valorValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(props.value.valor)}</Text>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetails(props.value)}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#EB708A"/>
            </TouchableOpacity>
        </View>
    );
})

export function todasComponent(){
    const [refreshing, setRefreshing] = useState(false);
    const [todasMensalidades, setTodasMensalidades] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [texto, setTexto] = useState('Nenhuma Mensalidade');
    const [page, setPage] = useState(1);

    useEffect(()=>{
        loadMensalidades();
        wait(1000).then(() => hideSplash());
    },[]);

    async function hideSplash(){
        await SplashScreen.hideAsync();
    }

    async function loadMensalidades(){
        try{
            if(loading)
                return;
            if(total > 0 && todasMensalidades > total)
                return;

            setLoading(true);
    
            const response = await api.get(`mensalidades/todas?page=${page}`);
            
            //let newArr = [];
            //newArr.push(... todasMensalidades);
            //newArr.push(... response.data);
    
            setTodasMensalidades(todasMensalidades.concat(response.data));
            setTotal(response.headers['X-Total-Count']);
            setPage(page + 1);
            setError(false);
            setTexto('Nenhuma Mensalidade');
            setLoading(false);
        }catch(e){
            setTexto('Erro de conexão (ツ)_/¯');
            setError(true);
        }
    }

    async function refreshMensalidades(){
        try{
            if(loading)
                return;
        
            if(total > 0 && todasMensalidades > total)
                return;
            
            setLoading(true);
            
            setTodasMensalidades([]);
            setPage(1);
            console.log(page)
            const res = await api.get(`mensalidades/todas?page=1`);
            
            let newArr = [];
            newArr.push(res.data);
    
            setTodasMensalidades([res.data]);
    
            setTotal(res.headers['X-Total-Count']);
            setLoading(false);
            setError(false);
            setTexto('Nenhuma Mensalidade');
        }catch(e){
            setTexto('Erro de conexão (ツ)_/¯');
            setError(true);
        }
    }  

    const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshMensalidades();
    
    wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    return(
        <View style={styles.container}>
            <FlatList
            data={todasMensalidades}
            ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>{texto}</Text>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            keyExtractor={todasMensalidades => String(todasMensalidades.idMensalidade)}
            onEndReached={loadMensalidades}
            onEndReachedThreshold={0.2}            
            ListFooterComponent={<RenderFooter value={loading} refreshing={refreshing} error={error}/>}
            renderItem={({ item: mensalidade })=>(
                <ListaComponent value={mensalidade} styleMensalidade={styles.mensalidadeValue}/>
            )}/>
        </View>
    );
}

export function proximasComponent(){
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [proximasMensalidades, setProximasMensalidades] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      loadMensalidades();
      
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(()=>{
        loadMensalidades();
    },[]);

    function navigateToDetails(mensalidade){
        navigation.navigate('DetalhesMensalidade',{mensalidade});
    }

    async function loadMensalidades(){
        if(loading){
            return;
        }

        if(total > 0 && proximasMensalidades > total){
            return;
        }
        
        setLoading(true);

        const response = await api.get(`mensalidades/proximas?page=${page}`);
  
        setProximasMensalidades([... proximasMensalidades, ...response.data]);
        setTotal(response.headers['X-Total-Count']);
        setPage(page + 1);
        setLoading(false);
    }

    return(
        <View style={styles.container}>
             <FlatList
            ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>Nenhuma mensalidade dentro de 7 dias</Text>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={proximasMensalidades.reverse()}
            keyExtractor={proximasMensalidades => String(proximasMensalidades.idMensalidade)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMensalidades}
            onEndReachedThreshold={0.2}
            renderItem={({ item: mensalidade })=>(
                <ListaComponent value={mensalidade} styleMensalidade={styles.mensalidadeValue}/>
            )}/>
        </View>
    );
}

export function pagasComponent(){
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [pagasMensalidades, setPagasMensalidades] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      refreshMensalidades();
      
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(()=>{
        loadMensalidades();
    },[]);

    async function loadMensalidades(){
        if(loading){
            return;
        }

        if(total > 0 && pagasMensalidades > total){
            return;
        }
        
        setLoading(true);

        const response = await api.get(`mensalidades/pagas?page=${page}`);
  
        setPagasMensalidades([... pagasMensalidades, ...response.data]);
        setTotal(response.headers['X-Total-Count']);
        setPage(page + 1);
        setLoading(false);
    }

    async function refreshMensalidades(){
        if(loading){
            return;
        }

        if(total > 0 && todasMensalidades > total){
            return;
        }
        
        setLoading(true);

        const res = await api.get(`mensalidades/pagas?page=1`);
        
        setPagasMensalidades([res.data]);
        setTotal(res.headers['X-Total-Count']);
        setPage(1);
        setLoading(false);
    }

    return(
        <View style={styles.container}>
             <FlatList
            ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>Nenhuma mensalidade paga</Text>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={pagasMensalidades.reverse()}
            keyExtractor={pagasMensalidades => String(pagasMensalidades.idMensalidade)}
            onEndReached={loadMensalidades}
            onEndReachedThreshold={0.2}
            renderItem={({ item: mensalidade })=>(
                <ListaComponent value={mensalidade} styleMensalidade={styles.mensalidadeValue}/>
            )}/>
        </View>
    );
}

export function atrasadasComponent(){
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [atrasadasMensalidades, setAtrasadasMensalidades] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      loadMensalidades();
      
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);

    useEffect(()=>{
        loadMensalidades();
    },[]);

    function navigateToDetails(mensalidade){
        navigation.navigate('DetalhesMensalidade',{mensalidade});
    }

    async function loadMensalidades(){
        if(loading){
            return;
        }

        if(total > 0 && atrasadasMensalidades > total){
            return;
        }
        
        setLoading(true);

        const response = await api.get(`mensalidades/atrasadas?page=${page}`);
  
        setAtrasadasMensalidades([... atrasadasMensalidades, ...response.data]);
        setTotal(response.headers['X-Total-Count']);
        setPage(page + 1);
        setLoading(false);
    }

    return(
        <View style={styles.container}>
             <FlatList
            ListEmptyComponent={<Text style={{alignSelf:'center', color:'#999'}}>Nenhuma mensalidade atrasada</Text>}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={atrasadasMensalidades.reverse()}
            keyExtractor={atrasadasMensalidades => String(atrasadasMensalidades.idMensalidade)}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMensalidades}
            onEndReachedThreshold={0.2}
            renderItem={({ item: mensalidade })=>(
                <ListaComponent value={mensalidade} styleMensalidade={styles.mensalidadeAtrasada}/>
            )}/>
        </View>
    );
}

