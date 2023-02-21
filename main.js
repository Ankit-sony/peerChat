let localStream;
let remoteStrem;
let peerConnection;

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302' ]
        }
    ]
}

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false}) 
    document.getElementById('user-1').srcObject =localStream
    createOffer()
}
let createOffer = async () =>{
    peerConnection = new RTCPeerConnection(servers)

    remoteStrem = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStrem

    localStream.getTracks().forEach((track) =>{
        peerConnection.addTrack(track, localStream)
    })


    peerConnection.ontrack = (event) => {
        event.strems[0].getTracks().forEach((track) => {
            remoteStrem.addTrack()
        })
    }
    
    peerConnection.onicecandidate = async (event) => {
    if(event.candidate){
        console.log("New ICE candidate:", event.candidate)
        }
    }
    



    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log('offer:', offer)
}

init()