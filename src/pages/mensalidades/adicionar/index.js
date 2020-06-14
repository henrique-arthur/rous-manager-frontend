import React, {useState, useEffect} from 'react';
import { 
    View, 
    KeyboardAvoidingView, 
    TouchableOpacity, 
    Text, 
    ActivityIndicator, 
    ScrollView, 
    Alert, 
    TextInput} 
    from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Picker } from'@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import styles from './styles';

import api from '../../../services/api';

export default function detalhes(){
    const navigation = useNavigation();
    
    const [loadBtn, setLoadBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cliente, setCliente] = useState(0);
    const [itens, setItens] = useState([]);
    const [formSender, setFormSender] = useState({
        produto: "",
        diaCobranca: "01",
        tempoContrato: "",
        mesInicial: "01",
        valor: "",
    });
    
    useEffect(() => {
    const loadonscreen = navigation.addListener('focus', () => {
        setFormSender({
            produto: "",
            diaCobranca: "01",
            tempoContrato: "",
            mesInicial: "01",
            valor: "",
        });
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
        .then((response) =>{
            let a = response.data;
            
            setItens(a);

            if(a !== [])
                setCliente(a[0].idCliente)
            else
                setCliente(0)
            
            setLoading(false);
        })
        .catch(e => {
            if(!e.response){
                return Alert.alert('Ops','Ocorreu um erro de conexão (ツ)_/¯');
            }
        });
    }

    async function novaCobranca(){
        console.log(cliente)
        setLoadBtn(true);
        if(formSender.tempoContrato === "" || formSender.valor === "" || formSender.produto === ""){
            setLoadBtn(false);
            return Alert.alert('Erro','Há campos vazios.');
        }
        if(cliente === 0){
            setLoadBtn(false);
            return Alert.alert('Erro','Cliente inválido.');
        }
        else{
            let toApi = formSender;
            
            toApi.valor = toApi.valor.substr(3, toApi.valor.length - 1)
            toApi.tempoContrato = parseFloat(toApi.tempoContrato);
            toApi.valor = toApi.valor.replace(".","");
            toApi.valor = toApi.valor.replace(",","");
            toApi.valor = toApi.valor.substr(0, toApi.valor.length - 2); //ANCHOR PAREI AQ

            api.post(`cobranca/nova/${cliente}`,toApi)
            .then(() =>{
                setLoadBtn(false);
                setFormSender({
                    produto: "",
                    diaCobranca: "01",
                    tempoContrato: "",
                    mesInicial: "01",
                    valor: "",
                });
                return Alert.alert('Sucesso','Contrato criado.');
            })
            .catch((e) => {
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
    }

    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>{navigation.goBack();}}><Feather name="arrow-left" size={28} color="black"/></TouchableOpacity>
            <Text style={styles.headerText}>Novo contrato</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.clienteContainer}>
            <Text style={styles.property}>Cliente</Text>
           
            {loading? <ActivityIndicator style={{ marginVertical: 15 }} size="small" color="#EB708A" /> 
            : 
            <Picker
            selectedValue={cliente}
            onValueChange={(itemValue, itemIndex) => setCliente(itemValue)}
            style={styles.picker, {marginBottom: 0}}>
            {
            itens.map((item, key)=>(
            <Picker.Item label={item.nome} value={item.idCliente} key={key} />))}
            </Picker>}
        </View>
        
        <KeyboardAvoidingView style={styles.clienteContainer}>
        <Text style={styles.property}>Nome do produto</Text>

            <TextInput 
            onChangeText={(produto => setFormSender((prevState) => {
                return { ...prevState, produto }
            }))}
            value={formSender.produto}
            placeholder="Nome" 
            placeholderTextColor="#999"
            style={styles.input}>
            </TextInput>

            <Text style={styles.property}>Dia da cobrança</Text>

            <Picker
            selectedValue={formSender.diaCobranca}
            style={{height: 50, width: 100}}
            onValueChange={(diaCobranca, itemIndex) => setFormSender((prevState) => {
                return { ...prevState, diaCobranca }
                }
            )}
            style={styles.picker}>
                <Picker.Item value={'01'} label={'1'}/>
                <Picker.Item value={'02'} label={'2'}/>
                <Picker.Item value={'03'} label={'3'}/>
                <Picker.Item value={'04'} label={'4'}/>
                <Picker.Item value={'05'} label={'5'}/>
                <Picker.Item value={'06'} label={'6'}/>
                <Picker.Item value={'07'} label={'7'}/>
                <Picker.Item value={'08'} label={'8'}/>
                <Picker.Item value={'09'} label={'9'}/>
                <Picker.Item value={'10'} label={'10'}/>
                <Picker.Item value={'11'} label={'11'}/>
                <Picker.Item value={'12'} label={'12'}/>
                <Picker.Item value={'13'} label={'13'}/>
                <Picker.Item value={'14'} label={'14'}/>
                <Picker.Item value={'15'} label={'15'}/>
                <Picker.Item value={'16'} label={'16'}/>
                <Picker.Item value={'17'} label={'17'}/>
                <Picker.Item value={'18'} label={'18'}/>
                <Picker.Item value={'19'} label={'19'}/>
                <Picker.Item value={'20'} label={'20'}/>
                <Picker.Item value={'21'} label={'21'}/>
                <Picker.Item value={'22'} label={'22'}/>
                <Picker.Item value={'23'} label={'23'}/>
                <Picker.Item value={'24'} label={'24'}/>
                <Picker.Item value={'25'} label={'25'}/>
                <Picker.Item value={'26'} label={'26'}/>
                <Picker.Item value={'27'} label={'27'}/>
                <Picker.Item value={'28'} label={'28'}/>
                <Picker.Item value={'29'} label={'29'}/>
                <Picker.Item value={'30'} label={'30'}/>
                <Picker.Item value={'31'} label={'31'}/>
            </Picker>

            <Text style={styles.property}>Mês inicial</Text>

            <Picker
            selectedValue={formSender.mesInicial}
            style={{height: 50, width: 100}}
            onValueChange={(mesInicial, itemIndex) => setFormSender((prevState) => {
                return { ...prevState, mesInicial }
                }
            )}
            style={styles.picker}>
                <Picker.Item value={'01'} label={'Janeiro'}/>
                <Picker.Item value={'02'} label={'Fevereiro'}/>
                <Picker.Item value={'03'} label={'Março'}/>
                <Picker.Item value={'04'} label={'Abril'}/>
                <Picker.Item value={'05'} label={'Maio'}/>
                <Picker.Item value={'06'} label={'Junho'}/>
                <Picker.Item value={'07'} label={'Julho'}/>
                <Picker.Item value={'08'} label={'Agosto'}/>
                <Picker.Item value={'09'} label={'Setembro'}/>
                <Picker.Item value={'10'} label={'Outubro'}/>
                <Picker.Item value={'11'} label={'Novembro'}/>
                <Picker.Item value={'12'} label={'Dezembro'}/>
            </Picker>
            
            <Text style={styles.property}>Tempo de Contrato</Text>

            <TextInput
            value={formSender.tempoContrato}
            onChangeText={(tempoContrato => setFormSender((prevState) => {
                return { ...prevState, tempoContrato }
            }))}
            autoCapitalize="none"
            placeholder="Valor em meses"
            placeholderTextColor="#999"
            keyboardType='decimal-pad'
            style={styles.input}
            />

            <Text style={styles.property}>Valor</Text>

            <TextInputMask
            type={'money'}
            options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: 'R$ ',
            suffixUnit: ''
            }}
            value={formSender.valor}
            onChangeText={(valor => setFormSender((prevState) => {
                return { ...prevState, valor }
            }))}
            autoCapitalize="none"
            placeholder="R$ 0,00"
            placeholderTextColor="#999"
            keyboardType='decimal-pad'
            style={styles.input}
            />
        </KeyboardAvoidingView> 
        

        <View style={styles.bottom}>
            <TouchableOpacity  
            onPress={novaCobranca} 
            style={styles.salvar}>   
            {(!loadBtn) ? <Text style={styles.txtpagar}>Salvar</Text> : <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
            </TouchableOpacity>          
        </View>
        </ScrollView>
    </View>
  );
}

