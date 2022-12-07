export interface PropsPayload {
    props: {
        isAudioEnabled: boolean,
        isVideoEnabled: boolean,
        status: string,
        participants: Map<any, any>,
        videoTracks: Map<any, any>,
        userName: string,
        roomName: string,
        token: string,
    }
    
}