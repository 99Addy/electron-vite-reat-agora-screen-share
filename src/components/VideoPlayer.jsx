import { useEffect, useRef } from "react";

const VideoPlayer = ({ localTrack, remoteTrack }) => {
  console.log("Video Player component loaded!");

  console.log("Local track value in Video Player:", localTrack);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localTrack && localVideoRef.current) {
      console.log("🎥 Playing local screen...");
      localTrack.play(localVideoRef.current);
    } else {
      console.log("⚠️ Local track is missing!");
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
          // style={{ width: "100%", height: "100vh" }}
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
