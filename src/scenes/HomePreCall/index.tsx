import { useNavigation } from '@react-navigation/native';
import { propsHandlerSet, propsSetUsername, propsSetRoomname, propsSetToken } from '@redux/propsHandler/actions';
import { propsHandlerFullInfo } from '@redux/propsHandler/selectors';
import { PropsPayload } from '@redux/propsHandler/types';
import { GenericNavigationProps } from '@routes/types';
import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  useColorScheme,
} from 'react-native';
import 'react-native-gesture-handler';
import { checkMultiple, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useSelector, useDispatch } from 'react-redux';
import styles from './styles';

const HomePreCall = () => {
  const API_URL = 'https://a497-113-160-172-8.ap.ngrok.io/';
  const navigation = useNavigation<GenericNavigationProps>();
  const dispatch = useDispatch();
  // const { props, setProps} = useSelector(propsHandlerFullInfo)
  const [propsPayload, setPropsPayload] = useState({
    isAudioEnabled: true,
    isVideoEnabled: true,
    status: 'disconnected',
    participants: new Map(),
    videoTracks: new Map(),
    userName: '',
    roomName: '',
    token: '',
  });
  // console.log('props',props.userName)
  const _checkPermissions = (callback?: any) => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO];
    checkMultiple(Platform.OS === 'ios' ? iosPermissions : androidPermissions).then(statuses => {
      const [CAMERA, AUDIO] = Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (statuses[CAMERA] === RESULTS.UNAVAILABLE || statuses[AUDIO] === RESULTS.UNAVAILABLE) {
        Alert.alert('Error', 'Hardware to support video calls is not available');
      } else if (statuses[CAMERA] === RESULTS.BLOCKED || statuses[AUDIO] === RESULTS.BLOCKED) {
        Alert.alert('Error', 'Permission to access hardware was blocked, please grant manually');
      } else {
        if (statuses[CAMERA] === RESULTS.DENIED && statuses[AUDIO] === RESULTS.DENIED) {
          requestMultiple(Platform.OS === 'ios' ? iosPermissions : androidPermissions).then(newStatuses => {
            if (newStatuses[CAMERA] === RESULTS.GRANTED && newStatuses[AUDIO] === RESULTS.GRANTED) {
              callback && callback();
            } else {
              Alert.alert('Error', 'One of the permissions was not granted');
            }
          });
        } else if (statuses[CAMERA] === RESULTS.DENIED || statuses[AUDIO] === RESULTS.DENIED) {
          request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(result => {
            if (result === RESULTS.GRANTED) {
              callback && callback();
            } else {
              Alert.alert('Error', 'Permission not granted');
            }
          });
        } else if (statuses[CAMERA] === RESULTS.GRANTED || statuses[AUDIO] === RESULTS.GRANTED) {
          callback && callback();
        }
      }
    });
  };

  useEffect(() => {
    _checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.text}>User Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              value={propsPayload.userName}
              onChangeText={text => setPropsPayload({ ...propsPayload, userName: text })}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.text}>Room Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              value={propsPayload.roomName}
              onChangeText={text => setPropsPayload({ ...propsPayload, roomName: text })}
            />
          </View>
          <View style={styles.formGroup}>
            <TouchableOpacity
              disabled={false}
              style={styles.button}
              onPress={() => {
                dispatch(propsSetUsername(propsPayload.userName));
                dispatch(propsSetRoomname(propsPayload.roomName));
                _checkPermissions(() => {
                  // fetch(`${API_URL}api/rooms/getToken/man`)
                  fetch(`${API_URL}getToken?userName=chinh`)
                    .then(response => {
                      if (response.ok) {
                        // console.log(response.text().then())
                        response.text().then(jwt => {
                          dispatch(propsSetToken(jwt));
                          navigation.navigate('Main', { screen: 'VideoCallScreen' });
                          return true;
                        });
                      } else {
                        response.text().then(error => {
                          Alert.alert(error);
                        });
                      }
                    })
                    .catch(error => {
                      console.log('error', error);
                      Alert.alert('API not available');
                    });
                });
              }}>
              <Text style={styles.connectButton}>Connect to Video Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default HomePreCall;
