import React from "react";



const runCpp = () => {

  const { spawn } = require('child_process'); 
  const child = spawn('a.exe', []); 
  
  child.stdout.on('data', (data) => { 
    console.log(`stdout: ${data}`); 
  }); 
}

export default runCpp