import { ChildProcess, spawn } from "child_process";
import { app, BrowserWindow, ipcMain } from "electron";
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

const processMap: Map<number, ChildProcess> = new Map<number, ChildProcess>();
ipcMain.on("startExec", (event: Event, arg: {exec: any, args: any, folder: any, processid: any}) => {
  const tmp = arg.args.split(" ");
  const proc = spawn(`${arg.exec}`, tmp, {cwd: arg.folder});
  processMap.set(arg.processid, proc);

  proc.stdout.on("data", (data) => {
    console.log(`${data}`);
    if (win) win.webContents.send("message", {context: data, process_id: arg.processid});
  });

  proc.stderr.on("data", (data) => {
    console.log(`${data}`);
    if (win) win.webContents.send("message", {context: data, process_id: arg.processid});
  });

  proc.on("error", (err: Error) => {
    console.log("err");
    console.log(err);
    if (win) win.webContents.send("message", {context: "error", process_id: arg.processid});
  });

  proc.on("close", (code: number, signal: string) => {
    console.log("close");
    if (win) win.webContents.send("message", {context: "close", process_id: arg.processid});
  });

  proc.on("exit", (code: number, signal: string) => {
    console.log("exit");
    if (win) win.webContents.send("message", {context: "exit", process_id: arg.processid});
  });
});

ipcMain.on("closeExec", (event: Event, arg: {processid: any}) => {
  const proc: ChildProcess | undefined = processMap.get(arg.processid);
  if (proc) {
    if (win) win.webContents.send("message", {context: "停止中...", process_id: arg.processid});
    const psPath = path.join(__dirname, "../scripts/script.ps1");
    // const psPath = path.join(__dirname, "../scripts/script2.ps1");
    // const pr = spawn("powershell.exe", [psPath, String(proc.pid)]);
    const pr = spawn("powershell.exe", ["-NoProfile", "-ExecutionPolicy", "Unrestricted", psPath, String(proc.pid)]);
    pr.stdout.on("data", (data) => {
      console.log(`${data}`);
    });
    pr.stderr.on("data", (data) => {
      console.log(`${data}`);
    });
    pr.on("error", () => {
      console.log("error");
    });
    pr.on("close", () => {
      console.log("close");
      if (win) win.webContents.send("message", {context: "close2", process_id: arg.processid});
    });
    pr.on("exit", () => {
      console.log("exit");
      if (win) win.webContents.send("message", {context: "exit2", process_id: arg.processid});
    });
  }
});
