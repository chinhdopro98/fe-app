import {
    View,
    TouchableOpacity,
    TextInput
} from 'react-native';
import {
    Button, 
    Box, 
    Stack, Text, Input, Checkbox,
    FormControl,
    Select,
    useToast } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { FC, useState } from 'react';
import CSafeAreaView from '@components/CSafeAreaView';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import type { registerData, errorMessage } from '@type';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import ApiClient from '@api';
import styles from './styles'

const RegisterPage: FC = () => {
    const navigation = useNavigation<GenericNavigationProps>();
    const toast = useToast()
    const [showPass, setShowPass] = useState(false)
    const handleShowPass = () => setShowPass(!showPass);
    const [formData, setData] = React.useState<registerData>({
        fullName: {
            firstName: '',
            lastName: '',
        },
        phone: '',
        email: '',
        password: '',
        role: 'CUSTOMER'
    });
    const [confirmPass, setConfirmPass] = React.useState('')
    const [errors, setErrors] = React.useState<errorMessage>({
        title: '',
        password: '',
    });

    const validate = () => {
        if (formData.fullName.firstName.length <= 0 && 
            formData.fullName.lastName.length <= 0 && 
            formData.phone.length <= 0 && 
            formData.email.length <= 0 &&
            formData.password.length <= 0 &&
            confirmPass.length <= 0) {
            setErrors({ ...errors,
                title: 'Field is required'
            });
            return false;
        } else if (confirmPass !== formData.password){
            setErrors({ ...errors,
                password: 'Password does not match'
            });
        }
        return true;    
    };
    const sendResData = async () => {
        await ApiClient.post('http://10.0.2.2:3001/auth/register', formData)
        .then(async (res) => {
            console.log(res.data);
            await toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
                                <Text>Sign-Up Completed</Text>
                        </Box>;
                    }
                });
            navigation.navigate('Main', {screen: 'Login'})
        })
        .catch(err => {
            console.log(err)
            toast.show({
                placement: 'top',
                render: () => {
                    return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={1}>
                                <Text>Error</Text>
                        </Box>;
                    }
                });
        });
        console.log(formData);
        
    }
    const onSubmit = () => {
        validate() ? 
            sendResData()
            : 
            console.log('Validation Failed');
    };
    return (
        <CSafeAreaView>
            <Box w='90%' h='100%' mx='auto' display='flex' justifyContent='center'>
                <Box w='100%'h='15%' display='flex' alignItems='center' justifyContent='center'>
                    <Text fontSize='36' fontWeight='bold'>Register</Text>
                </Box>
                <KeyboardAwareScrollView>
                    <Stack space={4} w="100%" mx="auto">
                        <FormControl isRequired >
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='First name'
                                    placeholderTextColor='grey'
                                    onChangeText={value => setData({ ...formData,
                                        fullName: {firstName: value, lastName: ''}
                                    })}  
                                /> 
                            </View>
                                {errors.title ? errors.title : undefined }
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='Last name'
                                    placeholderTextColor='grey'
                                    onChangeText={value => setData({ ...formData,
                                        fullName: {firstName: formData.fullName.firstName, lastName: value}
                                    })}
                                /> 
                            </View>
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='Phone number'
                                    placeholderTextColor='grey'
                                    onChangeText={value => setData({ ...formData,
                                        phone: value
                                    })} 
                                /> 
                            </View>
                                {errors.title ? errors.title : undefined }
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='Email'
                                    placeholderTextColor='grey'
                                    onChangeText={value => setData({ ...formData,
                                        email: value
                                    })} 
                                /> 
                            </View>
                                {errors.title ? errors.title : undefined }
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='Password'
                                    secureTextEntry={showPass}
                                    placeholderTextColor='grey'
                                    onChangeText={(value) => setData({ ...formData,
                                        email: value
                                    })}
                                /> 
                                <View style={styles.ShowIcon}>
                                    <TouchableOpacity
                                        onPress={() => setShowPass(!showPass)}
                                    >
                                    <Icon name={showPass ? "eye" : "eye-off"} size={27} color="#5b5b5b" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                                {errors.password ? errors.password  : undefined}
                            <View style={styles.InputCont}>
                                <TextInput style={styles.InputPass} 
                                    placeholder='Confirm Password'
                                    secureTextEntry={showPass}
                                    placeholderTextColor='grey'
                                    onChangeText={(value) => setConfirmPass(value)}
                                /> 
                                <View style={styles.ShowIcon}>
                                    <TouchableOpacity
                                        onPress={() => setShowPass(!showPass)}
                                    >
                                    <Icon name={showPass ? "eye" : "eye-off"} size={27} color="#5b5b5b" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Select 
                                selectedValue={formData.role} 
                                minWidth="200" accessibilityLabel="Select a role" 
                                placeholder="Select a role" 
                                _selectedItem={{
                                    bg: "red.400",
                                }} 
                                mt={1} 
                                rounded='md'
                                onValueChange={itemValue => setData({ ...formData,
                                    role: itemValue
                                })} 
                                _text={{fontSize: '16'}}
                            >
                                <Select.Item label="Customer" value="CUSTOMER" _text={{color: 'gray'}}/>
                                <Select.Item label="Interpreter" value="INTERPRETER" _text={{color: 'gray'}}/>
                                </Select> 
                        </FormControl>
                        <Button 
                            backgroundColor='red.400'
                            rounded='md'
                            h='60px'
                            mt={3}
                            _text={{color: 'white', fontWeight: 'bold', fontSize: '22', letterSpacing: '2'}}
                            onPress={onSubmit}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </KeyboardAwareScrollView>
                <Box w='100%' h='10%' display='flex' flexDirection='row' alignItems='center'>
                    <Text fontSize='17'>Already have an Account?</Text>
                    <Box style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Main', {screen: 'Login'})}
                        >
                            <Box style={styles.signInButton}>
                                <Text style={styles.buttonLabel}>Sign In</Text>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </CSafeAreaView>
    )
} 
export default RegisterPage