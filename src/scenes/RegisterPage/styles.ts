import { StyleSheet } from 'react-native';
import { blob } from 'stream/consumers';

const styles = StyleSheet.create({
    buttonContainer: {
        marginLeft: 'auto',
    },
    createLabel:{
        fontSize: 17,
    },
    signInButton:{
        backgroundColor: '#2f50d4',
        width: 100,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },
    buttonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    InputCont:{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 55,
        marginBottom: 10,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingLeft: 10,
    },
    InputPass:{
        width: '85%'
    },
    ShowIcon:{
        width: '15%',
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftColor: 'lightgray',
        borderLeftWidth: 1,
    },
})
export default styles;