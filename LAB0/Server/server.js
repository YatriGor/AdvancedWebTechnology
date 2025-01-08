const http = require('http')

const PORT = 3000;

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        res.write("This is the home page of the server");
        console.log(req.headers)
    }
    else if(req.url === '/about'){
        res.write("This is the About page of the server");
    }
    else if(req.url === '/content'){
        res.write("This is the content page of the server");
    }
    else{
        res.write("Page not found!");
    }
    res.end();
})

server.listen(PORT, ()=>{
    console.log("The server is running on", PORT)
})