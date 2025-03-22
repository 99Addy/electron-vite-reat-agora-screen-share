const { contextBridge, desktopCapturer, ipcRenderer } = require("electron");

console.log("✅ Preload script loaded successfully!");

// Debugging if desktopCapturer is available
console.log("🖥️ desktopCapturer:", desktopCapturer);

contextBridge.exposeInMainWorld("electron", {
  getScreenSources: async () => {
    console.log("📢 getScreenSources called in preload.js");

    console.log("📢 Requesting screen sources from main process...");
    return await ipcRenderer.invoke("get-screen-sources");

    // if (!desktopCapturer) {
    //   console.error("❌ desktopCapturer is undefined in preload.js!");
    //   return [];
    // }

    // return await desktopCapturer.getSources({ types: ["window", "screen"] });
  },
});
