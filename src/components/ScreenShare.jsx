import { useAgora } from "../context/AgoraContext";

const ScreenShare = ({ channelName, isChannelJoined, setLocalTrack }) => {
  const { agoraClient } = useAgora();

  console.log("🔗 In ScreenShare.jsx ; AgoraClient instance:", agoraClient);
  // console.log("🔗 Type of agoraClient:", typeof agoraClient);
  // console.log("🔗 Available properties:", Object.keys(agoraClient || {}));

  const startScreenShare = async () => {
    if (!channelName) {
      alert("Please enter a channel name.");
      return;
    }

    try {
      console.log(
        " In Screenshare.jsx; Requesting screen sources from preload.js..."
      );
      const sources = await window.electron.getScreenSources();

      if (sources.length === 0)
        return console.error("No screen sources found!");

      let source;

      if (sources.length === 1) {
        console.log("In Screenshare.jsx; Using source:", sources[0]);
        source = sources[0];
      } else {
        console.log("In Screenshare.jsx; Using source:", sources[1]);
        source = sources[1];
      }

      await agoraClient.joinChannel(channelName).then(() => {
        isChannelJoined(true);
        console.log(`🔗In Screenshare.jsx Joined channel: ${channelName}`);
      });

      await agoraClient.startScreenShare(source.id).then(() => {
        setLocalTrack(agoraClient.localTrack); // Pass to VideoPlayer
      });
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
