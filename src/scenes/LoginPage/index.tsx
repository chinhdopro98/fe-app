import { 
    View,
    Button,
    Link,
    Box,
    Stack, 
    Input, useToast } from 'native-base';
import React, { FC, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity 
} from 'react-native';
import type { UserLogin } from '@redux/reqres/types';
import { useDispatch, useSelector } from 'react-redux';
import styles from '@scenes/LoginPage/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { testHandlerSet } from '@redux/testHandler/actions';
import { testHandlerPayload } from '@redux/testHandler/types';
import { put } from 'redux-saga/effects';
import ApiClient from '@api';
import { navigate } from '@routes/navigationUtils';
import { propsHandlerFullInfo } from '@redux/propsHandler/selectors';

const LoginPage: FC = () => {
    const dispatch = useDispatch()
    const toast = useToast()
    const navigation = useNavigation<GenericNavigationProps>();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = React.useState(false);
    const [payloadLogin, setPayloadLogin] = React.useState<UserLogin>({
        // dataLogin: {
            email: '',
            password: ''
        // }
    })
    const [payloadData, setPayloadData] = useState<testHandlerPayload>({
        payloads: ''
    })
    const handleShowPass = () => setShowPass(!showPass);
    const onLogin = async () => {
        console.log(payloadLogin);
        // dispatch(loginUserRequest({email: username, password: passWord}))
        // ApiClient.post('http://10.0.2.2:3001/auth/login', payloadLogin)
        // .then(res => {
        //     console.log(res.data)
        //     toast.show({
        //         placement: 'top',
        //         render: () => {
        //             return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
        //                         <Text>Sign-In Successful</Text>
        //                 </Box>;
        //             }
        //         });
        //         navigation.navigate('Main', {screen: 'MainPage'})
        // })
        // .catch(err =>  {
        //     console.log(err)
        //     toast.show({
        //         placement: 'top',
        //         render: () => {
        //             return <Box bg="red.500" color='white' px="2" py="1" rounded="sm" mb={1}>
        //                         <Text>Sign-In Error</Text>
        //                 </Box>;
        //             }
        //         });
        // })
        // dispatch(testHandlerSet(payloadData))
        navigation.navigate('Main', {screen: 'HomePreCall'});
    }
    const {props} = useSelector(propsHandlerFullInfo)
    console.log('propsss', props)
    return (
    <Box style={styles.container}>
        <Box style={styles.headerInner}>
            <Text style={styles.title}>Interpreter 911</Text>
        </Box>
        <Box style={styles.centerInner}>
            <Box style={styles.formView} mb={5}>
            <Stack space={4} w="100%" mx="auto">
                <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Username or Email'
                        placeholderTextColor='grey'
                        onChangeText={value => setPayloadLogin({...payloadLogin, email: value})}
                    /> 
                </View>
                <View style={styles.InputCont}>
                    <TextInput style={styles.InputPass} 
                        placeholder='Password'
                        secureTextEntry={showPass}
                        placeholderTextColor='grey'
                        onChangeText={value => setPayloadLogin({...payloadLogin, password: value})}
                    /> 
                    <View style={styles.ShowIcon}>
                        <TouchableOpacity
                            onPress={() => setShowPass(!showPass)}
                        >
                        <Icon name={showPass ? "eye" : "eye-off"} size={27} color="#5b5b5b" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Stack>
            </Box>
            <Box
                mt={8}
                style={styles.loginButtonSection}
            >
                <Button 
                    backgroundColor='red.400'
                    rounded='md'
                    h='60px'
                    onPress={onLogin}
                    _text={{color: 'white', fontWeight: 'bold', fontSize: '22', letterSpacing: '2'}}
                >
                    Sign In
                </Button>
                <Box mt={5} style={styles.centerLink} >
                    <Link href="" _text={{fontSize: '15', textDecoration: 'none', color: 'blue.500'}}>
                        Forgot password?
                    </Link>
                </Box>
            </Box>
        </Box>
        <Box style={styles.footerInner}>
            <Text style={styles.createLabel}>Don't have an account?</Text>
            <Box style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main', {screen: 'Register'})}
                >
                    <Box style={styles.createButton}>
                    <Text style={styles.buttonLabel}>Create New</Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    </Box>
  );
};
export default LoginPage;
