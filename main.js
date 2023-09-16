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
},20000)
autoUpdater.on('checking-for-update',()=>{
    win.webContents.send('status','checking for updates')
})
autoUpdater.once('update-available',()=>{
    win.webContents.send('status','update available')
    autoUpdater.downloadUpdate();
})
autoUpdater.on('download-progress',(progress)=>{
    win.webContents.send('downloading','download is in progress',progress.percent)
})
autoUpdater.on('update-downloaded',()=>{
    win.webContents.send('status','update downloaded')
    autoUpdater.quitAndInstall()
})