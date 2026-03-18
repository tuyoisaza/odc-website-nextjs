const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/DEVPROD/ODC/docs/brief/ODC Visual Site Brief.pdf');

pdf(dataBuffer).then(function(data) {
    console.log("=== VISUAL SITE BRIEF ===");
    console.log(data.text);
}).catch(err => console.error(err));

let dataBuffer2 = fs.readFileSync('c:/DEVPROD/ODC/docs/brief/CREDENCIALES-ODC-On-Demand-Consulting.pdf');
pdf(dataBuffer2).then(function(data) {
    console.log("=== CREDENCIALES ===");
    console.log(data.text.substring(0, 3000));
}).catch(err => console.error(err));
