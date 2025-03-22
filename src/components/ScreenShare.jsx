import { useState } from "react";
import AgoraClient from "./AgoraClient";

const agoraClient = new AgoraClient("45cbaabd405f40f99e9ef10485d1d39d");

const ScreenShare = ({ channelName, isChannelJoined, setLocalTrack }) => {
  // const [screenTrack, setScreenTrack] = useState(null);

  const startScreenShare = async () => {
    if (!channelName) {
      alert("Please enter a channel name.");
      return;
    }

    try {
      console.log("Requesting screen sources...");
      const sources = await window.electron.getScreenSources();

      if (sources.length === 0)
        return console.error("No screen sources found!");

      console.log("Using source:", sources[0]);

      await agoraClient.joinChannel(channelName).then(() => {
        isChannelJoined(true);
        console.log(`🔗 Joined channel: ${channelName}`);
      });

      await agoraClient.startScreenShare(sources[0].id).then(() => {
        setLocalTrack(agoraClient.localTrack); // Pass to VideoPlayer
      });

      // if (agoraClient.remoteTrack) {
      //   onRemoteUserJoined();
      // }
    } catch (error) {
      console.error("Screen sharing failed:", error);
    }
  };

  return (
    <button
      onClick={startScreenShare}
      style={{ padding: "10px 20px", fontSize: "18px" }}
    >
      Start Screen Share
    </button>
  );
};

export default ScreenShare;
