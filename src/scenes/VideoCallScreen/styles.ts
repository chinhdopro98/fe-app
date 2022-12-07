import { 
    StyleSheet,
    Dimensions
} from 'react-native'
const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
    },
    form: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 20,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    formGroup: {
      margin: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
        padding: 10,
        backgroundColor: '#4a4a4a',
        borderRadius: 50,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    connectButton:{
      
    },
    textInput: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    callContainer: {
      flex: 1,
    },
    callWrapper: {
      flex: 1,
      justifyContent: 'center',
    },
    remoteGrid: {
      flex: 1,
    },
    remoteVideo: {
      flex: 1,
    },
    localVideo: {
      borderRadius: 30,
      position: 'absolute',
      right: 20,
      top: 30,
      width: dimensions.width / 4,
      height: dimensions.height / 4,
    },
  
    optionsContainer: {
        backgroundColor: '#333333',
        flex: 1,
        padding: 20,
        position: 'absolute',
        paddingHorizontal: 10,
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
      color: "red"
    }
  });
  export default styles