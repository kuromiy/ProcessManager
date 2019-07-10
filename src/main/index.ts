import { app, BrowserWindow } from "electron";
import path from "path";

let win: BrowserWindow | null;
const SIZE: number = 32;

const createWindow = () => {
  win = new BrowserWindow({
    height: SIZE * 20,
    webPreferences: {
      nodeIntegration: true,
    },
    width: SIZE * 35,
  });

  win.loadFile(path.join(__dirname, "./index.html"));
  win.setMenu(null);

  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) createWindow();
});
