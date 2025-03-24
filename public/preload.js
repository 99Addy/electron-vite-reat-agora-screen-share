const { contextBridge, desktopCapturer, ipcRenderer } = require("electron");

console.log("✅ Preload script loaded successfully!");

// Debugging if desktopCapturer is available
console.log("🖥️ desktopCapturer:", desktopCapturer);

contextBridge.exposeInMainWorld("electron", {
  getScreenSources: async () => {
    console.log("In preload.js : 📢 getScreenSources called in preload.js");

    console.log(
      "In preload.js : 📢 Requesting screen sources from main process..."
    );
    const source = await ipcRenderer.invoke("get-screen-sources");
    console.log("In preload.js : 📢 Available screen sources:", source);
    return source;

    // if (!desktopCapturer) {
    //   console.error("❌ desktopCapturer is undefined in preload.js!");
    //   return [];
    // }

    // return await desktopCapturer.getSources({ types: ["window", "screen"] });
  },
});
