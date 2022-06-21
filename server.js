const express = require("express"); // importing library
const https = require("https"); 
const port = 443; // making a variable "Const"
const app = express(); // use the library  (express is a function) calling express function that returns an object
const fs = require("fs")
const md5 = require("md5") // importing md5 libarary 
const bodyParser = require("body-parser"); // body parser is called middleware
const {createClient} = require("redis");
const redisClient = createClient ( // This code will run when I start redis // THis will connect to the credentails

{
    url: 'redis://default:mypassword1@10.128.0.2:6379',
    socket:{
        port:6379,
        host:"127.0.0.1", 
    }
}); // this creates a connection to the redis database

app.use(bodyParser.json()); // use the middleware (call it beofre anything happens on each request) .jason is a function. 


    https.createServer({
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
        passphrase: "P@ssw0rd",
    }, app).listen (port, async()=>{
        await redisClient.connect(); // Creating TCP socket with redis. @
        console.log("listening on port: "+port)  // waiting for network request.
    }) // listening    


// app.get('/',(request,response)=>
// {res.send("Hello");
// hm  // slash / means there are no parameters. 
// port 80 is resreved but we use non-standard port (443 is the secured and 80 is not)
// if you use a port more than a 1000 you don't have to be an admisntrator. 


// const validatepassword = async (reques, response)=>{
//     await redisclient.connect(); // createing a TCP socket with redis 
//     const requesthasedpassword = md5(request.body.credentails);
//     const redishashedpassword = await redisclient.hmGet("credentails",request.body.username);
//     const loginRequest = request.body;
//     console.log("Request Body", JSON.stringify(request.body));
//     //search database for username and retrive current password 
// }


const validatepassword = async (request, response)=>{
    const requesthasedpassword = md5(request.body.password);
    console.log ("The request hashed password "+requesthasedpassword);
    const redishashedpassword = await redisClient.hmGet('credentials', request.body.userName); // read password from redis
    console.log ("The redis hashed password "+redishashedpassword);
    const  loginRequest = request.body;
    console.log("Request Body", JSON.stringify(request.body));
    // search database username and retrive current password

    // Compare the hash version of the password that was sent with the hashed version from the database 


    if (requesthasedpassword==redishashedpassword){
        response.status(200);
        response.send("Welcome");
    } else{
        response.status(401);
        response.send("Unauthorized");

    }
    

}



const savePassowrd = async (request, response)=>{
    const clearTextPassword = request.body.password;
    const hasedTextPassword = md5(clearTextPassword); // self documenting code, the code tells you a story of what and why
    await redisClient.hSet('credentials', request.body.username, hasedTextPassword);
    response.status(200); // Status 200 menas okay 
    response.send("Saved");


}

// async function save password (request,response)


app.get("/" , (request, response)=>{  //Every tinme something calls your API that is a request. 
    response.send("Hello"); // A response is when an API gives the required information.
})

app.post("/login", validatepassword);



// Create a post where you would create a new user and password

    

app.post ("/signup", savePassowrd);


