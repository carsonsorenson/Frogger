let http = require('http');
let path = require('path');
let fs = require('fs');
let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.mp3': 'sound/mp3'
};

const port = 3005;

function handleRequest(request, response) {
    console.log(`request: ${request.url}`);
    let lookup = (request.url === '/') ? '/index.html' : decodeURI(request.url);
    let file = lookup.substring(1, lookup.length);

    fs.exists(file, function(exists) {
        console.log(exists ? `${lookup} ' is there` : `${lookup} doesn't exist`);
        if (exists) {
            fs.readFile(file, function(error, data) {
                if (error) {
                    response.writeHead(500);
                    response.end('Server Error!');
                }
                else {
                    let headers = {'Content-type': mimeTypes[path.extname(lookup)]};
                    response.writeHead(200, headers);
                    response.end(data);
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
}

http.createServer(handleRequest).listen(port, function() {
    console.log(`Server is listening on port ${port}`);
})