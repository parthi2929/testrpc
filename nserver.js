var zerorpc = require("zerorpc");
const spawn = require('child_process').spawn;
const http = require('http');
var express = require('express');
var app = express();
var DelayedResponse = require('http-delayed-response');



//start python server
var server = spawn('python', ['pyserver.py']);
var client = new zerorpc.Client({ timeout: 60,heartbeatInterval: 30000});
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
console.time('start_pyserver time');
client.invoke("start_pyserver", function(error, res, more) {
    console.log(res);                              // server response as per method invoked
    isPyServerStarted = true; 
    console.timeEnd('start_pyserver time');
});



app.get('/', (req, res) => res.send('Hello World!'));

function verySlowFunction(test_res, callback)
{
    // test_res.send('test time starts..!');
    // call dummy test function (predict image)
    console.time('predict_image_time');
    client.invoke("predict_image", "image path", function(error, res, more) {
        console.log(res);                              // server response as per method invoked
        console.timeEnd('predict_image_time');
        // test_res.send('py server responded with result');
        callback();
    });
}

app.get('/test', (req, res) => {

    var delayed = new DelayedResponse(req, res);
    verySlowFunction(res, delayed.start(1000,1000));  

    delayed.on('heartbeat', function (results) 
    {
        console.log('keeping the request alive');
    });

    delayed.on('done', function (results) 
    {
        console.log('slow function is done');    
        res.send('py server responded with result');
    });    
});


// start nodejs as server
var port = process.env.PORT || 8080;
app.listen(port, () => {
console.log(`Node Server started. Running at http://localhost:${port}/`);
});
