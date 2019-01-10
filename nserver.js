var zerorpc = require("zerorpc");
const spawn = require('child_process').spawn;
const http = require('http');


//start python server
var server = spawn('python', ['pyserver.py']);
var client = new zerorpc.Client();
var isPyServerStarted = false; 
if (server != null)
{
    console.log('Py server called');   // server call initiation success
    
}


// start nodejs as client for python server    
client.connect("tcp://127.0.0.1:4242");
client.on("error", function(error) {
    console.error("RPC client error:", error);     // error connecting from client
    isPyServerStarted = false;
});
client.invoke("start_pyserver", function(error, res, more) {
    console.log(res);                              // server response as per method invoked
    isPyServerStarted = true; 
});


// call dummy test function (predict image)
client.invoke("predict_image", "image path", function(error, res, more) {
    console.log(res);                              // server response as per method invoked
});


// start nodejs as server
const nserver = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });
var port = process.env.PORT || 8080;
nserver.listen(port, () => {
console.log(`Node Server started. Running at http://localhost:${port}/`);
});
