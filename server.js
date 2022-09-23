const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request made',req.url);
   
    // set header content type
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            // redirect from about-me
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send html file
    fs.readFile(path, (err, data) => {
        if (err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }

    })

});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000');
});