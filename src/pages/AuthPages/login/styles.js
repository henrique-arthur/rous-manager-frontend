import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 5,
        backgroundColor: '#f0f0f5'
 
    },

    loaderLogin:{
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight + 300,
    },
    
    bear: {
        alignSelf: 'center',
        paddingTop: 35,
    },
    headerText: {
        fontSize: 42,
        marginBottom: 16,
        marginTop: 48,
        fontWeight: 'bold',
    },

    input:{
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginTop: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        // marginTop: 35,
        // paddingBottom: 0,
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
        
    },

    incorretLogin:{
        alignSelf: 'center',
        marginTop: 10,
        color:'red',
    },

    login:{
        alignItems:'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        fontSize: 24,
        backgroundColor: 'black',
        color: 'white',
    },

    txtlogin:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    cadastro: {
        alignItems:'center',
        marginTop: 15,
        fontSize: 18,
        color: '#f0f0f5',
    },

    txtcadastro: {
        fontSize: 18,
        color: 'black',
    },
});