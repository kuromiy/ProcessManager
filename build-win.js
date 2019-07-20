const builder = require("electron-builder");
const Platform = builder.Platform;

builder.build({
  targets: Platform.WINDOWS.createTarget(),
  config: {
    win: {
      target: "nsis",
      appId: "com.example.processmanager",
    },
    files: [
      "build/*",
      "scripts/*"
    ],
    extends: null,
  }
}).then(() => {
  console.log("DONE");
}).catch((err) => {
  console.log(err);
})
