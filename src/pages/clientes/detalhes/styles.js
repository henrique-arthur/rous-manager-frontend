import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 15,
        backgroundColor: '#f0f0f5',
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

    content: {
        flexDirection:'row',
        justifyContent:'space-between',
    },

    clienteProperty: {
        fontSize: 14,
        color: '#41414D',
        fontWeight:'bold',
    },

    clienteValue: {
        marginTop: 4,
        fontSize: 16,
        marginBottom: 24,
        color: '#737380',
    },

    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    touchContainer:{
        flexDirection:'row'
    },

    mensalidadeContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },

    mensalidadeProperty: {
        fontSize: 16,
        color: '#41414D',
        fontWeight:'bold',
        alignSelf: 'center',
    },

    mensalidadeValue: {
        fontSize: 16,
        color: '#737380',
        alignSelf: 'center',
    },
    
    btnmens: {
        alignItems:'center',
        height: 50,
        borderRadius: 20,
        marginTop: 20,
        fontSize: 24,
        backgroundColor: '#000',
        color: 'white',
        justifyContent: 'center',
    },

    textcenter:{
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    txtmens: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 0,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 60
      },
})