import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: '#fff',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingBottom: 8,
    },
    text:{
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 24,
        alignItems:'center',
        marginLeft: 15,
    },
    icons: {
        flexDirection:'row',
        alignItems:'center',
        
    },
    icon: {
        marginRight: 0,
        alignItems:'center',
        padding: 0,
    },
});
