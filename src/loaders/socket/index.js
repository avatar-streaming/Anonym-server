const http = require("http");
const app = require("../../app");
const server = http.createServer(app);
const wrtc = require("wrtc");
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const receiverPCs = {};
let senderPCs = {};
const streamings = {};
const pc_config = {
  "iceServers": [
    {
      urls: "stun:stun.l.google.com:19302",
    }
  ],
};
const intervalIDs = {};

const createReceiverPeerConnection = (socket, socketID, roomID) => {
  const pc = new wrtc.RTCPeerConnection(pc_config);
  receiverPCs[socketID] = pc;

  pc.onicecandidate = (event) => {
    socket.to(socketID).emit("getSenderCandidate", {
      candidate: event.candidate,
    });
  };

  pc.ontrack = (event) => {
    streamings[roomID] = {
      id: socketID,
      stream: event.streams[0],
    };
  };

  pc.ondatachannel = (event) => {
    console.log("receive ondatachannel");
    const dc = event.channel;

    dc.onmessage = (event) => {
      streamings[roomID].image = event.data;
    };
  };

  return pc;
};

const createSenderPeerConnection = (receiverSocketID, senderSocketID, socket, roomID) => {
  const pc = new wrtc.RTCPeerConnection(pc_config);

  if (senderPCs[senderSocketID]) {
    senderPCs[senderSocketID] = senderPCs[senderSocketID].filter(user => user.id !== receiverSocketID);
    senderPCs[senderSocketID].push({ id: receiverSocketID, pc });
  } else {
    senderPCs[senderSocketID] = [{ id: receiverSocketID, pc }];
  }

  pc.onicecandidate = (event) => {
    socket.to(receiverSocketID).emit("getReceiverCandidate", {
      id: senderSocketID,
      candidate: event.candidate,
    });
  };

  const targetStreaming = streamings[roomID];
  targetStreaming.stream.getTracks().forEach(track => {
    pc.addTrack(track, targetStreaming.stream);
  });

  pc.ondatachannel = (event) => {
    const dc = event.channel;

    intervalIDs[receiverSocketID] = setInterval(() => {
      dc.send(streamings[roomID].image);
    }, 100);
  };

  return pc;
};

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    socket.join(roomID);

    socket.on("chat", (chat) => {
      socket.broadcast.to(roomID).emit("other user chat", chat);
    });
  });

  socket.on("leave room", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("join streaming", ({ id, roomID }) => {
    try {
      const streamerID = streamings[roomID].id;
      io.to(id).emit("receive streaming", { streamerID, roomID });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("senderCandidate", async ({ senderSocketID, candidate }) => {
    try {
      const pc = receiverPCs[senderSocketID];
      await pc.addIceCandidate(new wrtc.RTCIceCandidate(candidate));
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("senderOffer", async ({ senderSdp, senderSocketID, roomID }) => {
    try {
      const pc = createReceiverPeerConnection(socket, senderSocketID, roomID);
      await pc.setRemoteDescription(senderSdp);

      const sdp = await pc.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await pc.setLocalDescription(sdp);

      socket.join(roomID);
      io.to(senderSocketID).emit("getSenderAnswer", { sdp });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("receiverCandidate", async ({ senderSocketID, receiverSocketID, candidate }) => {
    try {
      const senderPC = senderPCs[senderSocketID].filter(senderPC => senderPC.id === receiverSocketID);
      await senderPC[0].pc.addIceCandidate(new wrtc.RTCIceCandidate(candidate));
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("receiverOffer", async ({ receiverSdp, receiverSocketID, senderSocketID, roomID }) => {
    try {
      const pc = createSenderPeerConnection(receiverSocketID, senderSocketID, socket, roomID);
      await pc.setRemoteDescription(receiverSdp);

      const sdp = await pc.createAnswer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false,
      });
      await pc.setLocalDescription(sdp);

      io.to(receiverSocketID).emit("getReceiverAnswer", { id: senderSocketID, sdp });
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = server;
