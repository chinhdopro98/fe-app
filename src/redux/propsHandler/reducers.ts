import { createReducer } from "@reduxjs/toolkit";
import { 
    propsHandlerSet, 
    propsHandlerReset,
    propsSetUsername,  
    propsEnableAudio, 
    propsEnableVideo, 
    propsSetPerson,
    propsSetTrack,
    propsSetRoomname,
    propsSetStatus,
    propsSetToken
} from "./actions";

export interface IProps{
    props:{
        isAudioEnabled: boolean,
        isVideoEnabled: boolean,
        status: string,
        participants: Map<any, any>,
        videoTracks: Map<any, any>,
        userName: string ,
        roomName: string,
        token: string,
    },
    setProps: any | null
}
const initialState: IProps = {
    props:{
        isAudioEnabled: true,
        isVideoEnabled: true,
        status: 'disconnected',
        participants: new Map(),
        videoTracks: new Map(),
        userName: '',
        roomName: '',
        token: '',
    },
    setProps: null
}
const propsReducer = createReducer(initialState, {
    [propsHandlerSet.type]: (state, action) => {
        state.props = action.payload.props;
    },
    [propsEnableAudio.type]: (state, {payload}) =>{
        state.props.isAudioEnabled = payload
    },
    [propsEnableVideo.type]: (state, {payload}) =>{
        state.props.isVideoEnabled = payload 
    },
    [propsSetStatus.type]: (state, {payload}) => {
        state.props.status = payload;
    },
    [propsSetPerson.type]: (state, {payload}) => {
        state.props.participants = payload;
    },
    [propsSetTrack.type]: (state, {payload}) => {
        state.props.videoTracks = payload;
    },
    [propsSetUsername.type]: (state, {payload}) => {
        state.props.userName = payload;
    },
    [propsSetRoomname.type]: (state, {payload}) => {
        state.props.roomName = payload;
    },
    [propsSetToken.type]: (state, {payload}) => {
        state.props.token = payload;
    },
    [propsHandlerReset.type]: (state) => {
        state.props.isAudioEnabled = true,
        state.props.isVideoEnabled = true,
        state.props.status = 'disconnected',
        state.props.participants = new Map(),
        state.props.videoTracks = new Map(),
        state.props.userName = '',
        state.props.roomName = '',
        state.props.token = ''
    },
})
export default propsReducer