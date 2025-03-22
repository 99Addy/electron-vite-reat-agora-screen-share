import { useState, useEffect } from "react";
import ScreenShare from "./ScreenShare copy";
import VideoPlayer from "./VideoPlayer";

const ScreenShareApp = () => {
  const [channelName, setChannelName] = useState("");
  const [channelJoined, setChannelJoined] = useState(false);
  const [localTrack, setLocalTrack] = useState(null);

  useEffect(() => {
    if (channelJoined) {
      console.log("Switching to VideoPlayer mode");
    }
  }, [channelJoined]);

  return (
    <div style={{ textAlign: "center" }}>
      {!channelJoined ? (
        <>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter Channel Name"
            style={{ padding: "10px", marginBottom: "10px" }}
          />
          <ScreenShare
            channelName={channelName}
            isChannelJoined={() => setChannelJoined(true)}
            setLocalTrack={setLocalTrack}
          />
        </>
      ) : (
        <VideoPlayer localTrack={localTrack} />
      )}
    </div>
  );
};

export default ScreenShareApp;
