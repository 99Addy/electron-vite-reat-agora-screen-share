import { createContext, useContext, useState, useEffect } from "react";
import AgoraClient from "../components/AgoraClient";

const AgoraContext = createContext();

export const AgoraProvider = ({ children }) => {
  const agoraClient = new AgoraClient("45cbaabd405f40f99e9ef10485d1d39d"); // Initialize once
  const [remoteTrack, setRemoteTrack] = useState(null);

  // Listen for new remote users joining
  useEffect(() => {
    const handleUserPublished = async (user, mediaType) => {
      console.log("📡 In Agora Context ; User published ", user, mediaType);
      await agoraClient.client.subscribe(user, mediaType);
      if (mediaType === "video") {
        console.log("📡 Remote user joined");
        setRemoteTrack(user.videoTrack);
      }
    };

    agoraClient.client.on("user-published", handleUserPublished);

    agoraClient.client.on("user-unpublished", () => {
      console.log("❌ Remote user left.");
    });

    return () => {
      agoraClient.client.off("user-published", handleUserPublished);
    };
  }, [agoraClient.client.connectionState]);

  return (
    <AgoraContext.Provider value={{ agoraClient, remoteTrack }}>
      {children}
    </AgoraContext.Provider>
  );
};

// Custom hook to access AgoraContext
export const useAgora = () => useContext(AgoraContext);
