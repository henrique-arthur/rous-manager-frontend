import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 15,
        backgroundColor: '#f0f0f5',
    },

    title:{
        fontSize: 20,
        fontWeight:'bold',
        marginRight: 10,
    },

    cliente: {
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

    clienteProperty: {
        fontSize: 14,
        color: '#41414D',
        fontWeight:'bold',
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

    inputCidade:{
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
        width: 195,
        maxWidth: 195,
    },

    inputUf:{
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
        width: 58,
        maxWidth: 58,
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

    txtSalvar: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },

})