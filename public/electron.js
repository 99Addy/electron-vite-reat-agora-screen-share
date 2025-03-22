import { app, BrowserWindow, ipcMain, desktopCapturer } from "electron";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      contextIsolation: true, // Protects against prototype pollution
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  // console.log("Chromium Version:", process.versions.chrome);
  // Chromium Version: 134.0.6998.44 is transparent for contentProtection and is used by last electron version 35.0.0
  // same version is used by electron 35.0.1 shows black screen for contentProtection
  mainWindow.setContentProtection(true);

  mainWindow.loadURL("http://localhost:5173");
  console.log("URL loaded :", "http://localhost:5173");
  console.log("Preload script path :", join(__dirname, "preload.js"));
};

// Handle screen capture request from the renderer process
ipcMain.handle("get-screen-sources", async () => {
  console.log("📢 get-screen-sources called in main.js");
  const sources = await desktopCapturer.getSources({
    types: ["screen"],
  });
  console.log(
    "📢Showing only available screen source as in main Process:",
    sources
  );
  return sources;
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
