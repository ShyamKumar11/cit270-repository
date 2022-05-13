const express = require("express"); // importing library 
const bodyParser = require("body-parser"); // body parser is called middleware
const port = 3000;
const app = express(); // use the library  (express is a function)
const md5 = require("md5")

app.use(bodyParser.json()); // use the middleware (call it beofre anything happens on each request)

app.listen (port,()=>{
    console.log("listening on port: "+port)  // waiting for network request.
})  // listening    

app.get('/',(req,res)=>
{res.send("Hello");
})   // slash / means there are no parameters. 
// port 80 is resreved but we use non-standard port (443 is the secured and 80 is not)
// if you use a port more than a 1000 you don't have to be an admisntrator. 


app.post("/login", (request, response)=>{  // a post is wheb a client sends new information to an API (curl in appclient calling the functions)
    const  loginRequest = request.body;
    // search database username and retrive current password

    // Compare the hash version of the password that was sent with the hashed version from the database 

    if (loginRequest.userName == "kumar_32@gmail.com" && loginRequest.password == "Stedi@3456"){  // login request is an object and each object has bubch of feilds, so user name and password are a field)
        response.status(200); // 200 menas ok
        response.send("Welcome");
    } else{
        response.status(401); //401 means unauthorized
        response.send("Unauthroized");
    }

});

app.get("/" , (request, response)=>{  //Every tinme something calls your API that is a request. 
    response.send("Hello"); // A response is when an API gives the required information.
})



