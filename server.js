
const express = require("express"); // importing library 

const app = express(); // use the library 

app.listen (3000,()=>{console.log("listening...")});  // listening    

app.get('/',(req,res)=>{res.send("Hello")});
// port 80 is resreved but we use non-standard port (443 is the secured and 80 is not)
// if you use a port more than a 1000 you don't have to be an admisntrator. 

