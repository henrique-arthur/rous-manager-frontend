import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 5,
        backgroundColor: '#f0f0f5',
    },

    header:{
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    headerText: {
        fontSize: 42,
        marginLeft: 16,
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
        
    },

    cadastro: {
        alignItems:'center',
        height: 50,
        borderRadius: 20,
        marginTop: 50,
        fontSize: 24,
        backgroundColor: 'black',
        color: 'white',
        justifyContent: 'center',
        //position: 'absolute',
        //bottom:0

    },

    txtcadastro: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
      }

});