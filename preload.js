let {contextBridge,ipcRenderer}=require('electron')
let text="";
ipcRenderer.on('status',(e,data)=>{
    let div = document.getElementById("container");
    text+=data+"\n";
    div.innerText=text;
})