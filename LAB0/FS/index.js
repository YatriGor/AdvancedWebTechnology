const http = require('http');
const fs = require('fs')

const PORT = 3001
let log;
const server = http.createServer((req,res)=>{
    res.write("Hello Welcome")
    if(req.url === '/'){
        log = `${Date.now()} : new request noted on HOME page.\n`
    }
    else if(req.url === '/about'){
        log = `${Date.now()} : new request noted on ABOUT page.\n`
    }
    else if(req.url === '/content'){
        log = `${Date.now()} : new request noted on CONTENT page.\n`
    }
    fs.appendFile('log.txt', log, (err) => {
        if(err){
            console.log("Error occured");
        }
        else{
            console.log('Log updated successfully.')
        }
    })
    res.end();
})

server.listen(PORT, ()=>{
    console.log("Server is Running on", PORT)
})