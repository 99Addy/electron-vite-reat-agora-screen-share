import { useEffect, useRef } from "react";
import { useAgora } from "../context/AgoraContext";

const VideoPlayer = ({ localTrack }) => {
  console.log("Video Player component loaded!");
  const { remoteTrack } = useAgora(); // Access global state
  console.log("🎥 In VideoPlayer ; localTrack:", localTrack);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localTrack && localVideoRef.current) {
      console.log("🎥 Playing local screen...");
      localTrack.play(localVideoRef.current);
    }

    if (remoteTrack && remoteVideoRef.current) {
      console.log("📡 Playing remote screen...");
      remoteTrack.play(remoteVideoRef.current);
    }
  }, [localTrack, remoteTrack]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "black",
      }}
    >
      {remoteTrack && (
        <video
          ref={remoteVideoRef}
          style={{ width: "100%", height: "100vh" }}
          autoPlay
        />
      )}
      {localTrack && (
        <video
          ref={localVideoRef}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "250px",
            height: "150px",
            border: "2px solid white",
          }}
          autoPlay
          muted
        />
      )}
    </div>
  );
};

export default VideoPlayer;
