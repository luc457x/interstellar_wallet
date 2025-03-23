const { app, BrowserWindow } = require('electron');
const functions = require('./js/functions.js');


const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 960,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})