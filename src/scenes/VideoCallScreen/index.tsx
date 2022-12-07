import 'react-native-gesture-handler';
import React, { 
    useState, 
    useRef, 
    useEffect,
} from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    useColorScheme
  } from 'react-native';
import {
TwilioVideoLocalView,
TwilioVideoParticipantView,
TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import { useNavigation } from '@react-navigation/native';
import { GenericNavigationProps } from '@routes/types';
import { propsHandlerFullInfo } from '@redux/propsHandler/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { 
    propsHandlerReset,
    propsSetStatus, 
    propsSetToken,
    propsEnableAudio, 
    propsEnableVideo,
    propsSetTrack,
    propsSetPerson
} from '@redux/propsHandler/actions';
import styles from './styles'

const VideoCallScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation<GenericNavigationProps>()
    const twilioVideo = useRef<any>(null);
    console.log("ok1", twilioVideo)
    const [open, setOpen] = useState(true)

    const { props, setProps } = useSelector(propsHandlerFullInfo)

    useEffect(() => {
        twilioVideo.current.connect({
        roomName: props.roomName, 
        accessToken: props.token,
        // enableVideo:videoLocal,
        region: 'gll',
        bandwidthProfile: {
            video: {
            mode: 'grid',
            maxSubscriptionBitrate: 2500000,
            dominantSpeakerPriority: 'standard'
            }
        },
        dominantSpeaker: true,
        dominantSpeakerPriority: 'high',
        maxAudioBitrate: 16000, //For music remove this line
        preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
        networkQuality: { local: 1, remote: 2 }
        });
        console.log("ok", twilioVideo.current)
        // setProps({ ...props, status: 'connecting' });
        dispatch(propsSetStatus('connecting'))
        return () => {
        _onEndButtonPress();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _onEndButtonPress = () => {
        twilioVideo.current.disconnect();
        dispatch(propsHandlerReset)
    };

    const _onMuteButtonPress = () => {
        twilioVideo.current
        .setLocalAudioEnabled(!props.isAudioEnabled)
        .then((isEnabled: any) => 
            // setProps({ ...props, isAudioEnabled: isEnabled })
            dispatch(propsEnableAudio(isEnabled))
        );
    };

    const _onFlipButtonPress = () => {
        twilioVideo.current.flipCamera();

    };

    const _onDisableVideoButtonPress = () => {
        twilioVideo.current
        .setLocalVideoEnabled(!props.isVideoEnabled)
        .then((isEnabled: any) => 
            // setProps({ ...props, isVideoEnabled: isEnabled })
            dispatch(propsEnableVideo(isEnabled))
        )
    }

    return (
        <View style={styles.callContainer}>

        <View style={{ flex: 1, marginBottom: '10%' }}>
            {(props.status === 'connected' || props.status === 'connecting') && (
            <View style={styles.callWrapper}>
                {props.status === 'connected' && (
                <View style={styles.remoteGrid}>
                    {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => (
                    <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                    />
                    ))}
                </View>
                )}
            </View>
            )}

            <TwilioVideoLocalView
            enabled={props.status === 'connected'}
            applyZOrder={true}
            style={styles.localVideo}
            />

        </View>


        
            <View style={styles.optionsContainer}>
            
                
                <TouchableOpacity style={[styles.button, { backgroundColor: '#ed3b2d', marginLeft: 10 }]} onPress={_onEndButtonPress}>

                    <Text>End</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={_onMuteButtonPress}>
                    {props.isAudioEnabled ? <Text>Mute</Text> : <Text>UnMute</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={_onDisableVideoButtonPress}>
                    {props.isVideoEnabled ? <Text>On</Text> : <Text>Off</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={_onFlipButtonPress}>
                    {/* <Text style={styles.buttonText}>Flip</Text> */}
                    <Text>Flip</Text>
                </TouchableOpacity>
            

            </View> 
        

        <TwilioVideo
            ref={twilioVideo}
            onRoomDidConnect={() => {
                // setProps({ ...props, status: 'connected' });
                dispatch(propsSetStatus('connected'))
            }}
            onRoomDidDisconnect={() => {
                // setProps({ ...props, status: 'disconnected' });
                dispatch(propsSetStatus('disconnected'))
                navigation.goBack();
            }}
            onRoomDidFailToConnect={(error) => {
                Alert.alert('Error', error.error);
                // setProps({ ...props, status: 'disconnected' });
                dispatch(propsSetStatus('disconnected'))
                navigation.goBack();
            }}
            onParticipantAddedVideoTrack={({ participant, track }) => {
            if (track.enabled) {
                // setProps({
                // ...props,
                // videoTracks: new Map([
                //     ...props.videoTracks,
                //     [
                //     track.trackSid,
                //     {
                //         participantSid: participant.sid,
                //         videoTrackSid: track.trackSid,
                //     },
                //     ],
                // ]),
                // });
                dispatch(propsSetTrack(new Map([
                    [
                    track.trackSid,
                    {
                        participantSid: participant.sid,
                        videoTrackSid: track.trackSid,
                    },
                    ],
                ])))
            }
            }}
            onParticipantRemovedVideoTrack={({ track }) => {
            const videoTracks = props.videoTracks;
            videoTracks.delete(track.trackSid);
            // setProps({ ...props, videoTracks });
            dispatch(propsSetTrack(videoTracks))
            }}
        />
        </View>
    );
};
export default VideoCallScreen