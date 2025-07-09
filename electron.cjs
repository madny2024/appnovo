const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // ===================================================================
      // || INÍCIO DA SOLUÇÃO DEFINITIVA                                  ||
      // ===================================================================
      // Desabilita a política de mesma origem, resolvendo todos os erros de CORS.
      webSecurity: false,
      // ===================================================================
      // || FIM DA SOLUÇÃO                                                ||
      // ===================================================================
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'public', 'logo.ico')
  });

  // O resto do arquivo permanece o mesmo...
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["default-src 'self' 'unsafe-inline'; connect-src *; media-src *;"]
      }
    });
  });

  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// ... resto do arquivo
app.whenReady().then(() => {
  createWindow();
  // ...
});
// ...