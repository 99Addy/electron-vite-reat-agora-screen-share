import AgoraRTC from "agora-rtc-react";

class AgoraClient {
  constructor(appId) {
    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    AgoraRTC.setLogLevel(2);

    this.localTrack = null;
    this.remoteTrack = null;
    this.channel = "";
    this.appId = appId;
  }

  async joinChannel(channelName) {
    this.channel = channelName;
    console.log(`🔗 Joining channel: ${channelName}`);

    await this.client.join(this.appId, channelName, null, null);

    this.client.on("user-published", async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);

      if (mediaType === "video") {
        this.remoteTrack = user.videoTrack;
        console.log("📡 In AgoraClient.jsx ; Remote user joined the channel");
      }
    });

    this.client.on("user-unpublished", (user) => {
      console.log("❌ Remote user left.");
      this.remoteTrack = null;
    });
  }

  async startScreenShare(screenSourceId) {
    console.log("🖥️ Attempting to start screen share...");

    this.localTrack = await AgoraRTC.createScreenVideoTrack({
      encoderConfig: "1080p_3",
      electronScreenSourceId: screenSourceId,
    });

    console.log("✅ local Screen share track created:", this.localTrack);
    await this.client.publish(this.localTrack);
    console.log("🚀 Screen sharing published to channel!");
  }
  catch(error) {
    console.error("❌ Error starting screen share:", error);
  }

  stopScreenShare() {
    if (this.localTrack) {
      this.localTrack.stop();
      this.localTrack.close();
      this.client.unpublish(this.localTrack);
      this.localTrack = null;
      console.log("⛔ Screen sharing stopped.");
    }
  }
}

export default AgoraClient;
