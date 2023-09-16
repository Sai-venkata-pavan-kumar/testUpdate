let {contextBridge,ipcRenderer}=require('electron')
let text="";
ipcRenderer.on('status',(e,data)=>{
    let div = document.getElementById("container");
    text+=data+"\n";
    div.innerText=text;
})
ipcRenderer.on('downloading',(e,text1,progress)=>{
    text+=text1+progress+"\n";
    div.innerText=text
})