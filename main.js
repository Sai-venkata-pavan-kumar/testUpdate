const {app,BrowserWindow}=require('electron')
const path=require('path')
require("update-electron-app")({
  repo: "Sai-venkata-pavan-kumar/testUpdate",
});
const {autoUpdater}=require('electron-updater')
let win;
function createWindow(){
    win=new BrowserWindow({
        webPreferences:{
            contextIsolation:false,
            nodeIntegration:true,
            preload:path.join(__dirname,'preload.js')
        }
    })
    win.loadFile(path.join(__dirname,'index.html'))
}
app.on('ready',()=>{
    createWindow()
    win.webContents.send("test", "hi");
})
setInterval(()=>{
    autoUpdater.checkForUpdates();
})
autoUpdater.on('checking-for-update',()=>{
    win.webContents.send('status','checking for updates')
})
autoUpdater.on('update-available',()=>{
    win.webContents.send('status','update available')
})
autoUpdater.on('download-progress',()=>{
    win.webContents.send('status','download is in progress')
})
autoUpdater.on('update-downloaded',()=>{
    win.webContents.send('status','update downloaded')
})