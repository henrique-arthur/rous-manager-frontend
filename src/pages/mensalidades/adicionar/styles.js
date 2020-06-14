import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 15,
        backgroundColor: '#f0f0f5',
    },

    header:{
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
    },
    
    headerText: {
        fontSize: 28,
        marginLeft: 16,
        fontWeight: 'bold',
    },

    clienteContainer: {
        padding: 20,
        margin: 4,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        shadowColor: "#000", //ANCHOR SOMBRA
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    property: {
        fontSize: 14,
        color: '#41414D',
        fontWeight:'bold',
    },

    mensalidadeValue: {
        marginTop: 4,
        fontSize: 16,
        marginBottom: 24,
        color: '#737380',
    },
    valorValue: {
        marginTop: 4,
        fontSize: 16,
        marginBottom: 0,
        color: '#9ED230',
    },

    input:{
        marginTop: 4,
        fontSize: 16,
        marginBottom: 24,
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

    picker:{
        paddingHorizontal: 15,
        marginBottom: 24,        
    },

    salvar: {
        alignItems:'center',
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        fontSize: 24,
        backgroundColor: '#EB708A',
        color: 'white',
        justifyContent: 'center',

    },

    txtpagar: {
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
