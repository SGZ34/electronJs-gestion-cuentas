const electron = require("electron");

const { BrowserWindow } = require("electron");

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: width,
    height: height,
    title: "Aplicación de gestión de cuentas de Omegapro",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.maximize();

  window.loadFile("src/ui/views/index.html");
}

module.exports = {
  createWindow,
};
