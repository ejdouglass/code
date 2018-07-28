 const express = require('express');
 const bodyParser = require('body-parser');
 const path = require('path');
 const http = require('http');
 const app = express();

 // This defines a constant defined by grabbing the exported api in its own file
 const api = require('./server/routes/api');

 // Parsers
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false}));

 // Serve static files
 // This makes it so that the "dist" folder is where it looks for static files like css and js!
 app.use(express.static(path.join(__dirname, 'dist')));

 // Set up our api routes
 app.use('/api', api);

 // Return other routes (i.e. non-api routes) to Angular index file
 app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
 });

 // Set port
 const port = process.env.PORT || '3000';
 app.set('port', port);

 // Create the HTTP Server
 const server = http.createServer(app);

 server.listen(port, () => console.log(`Running on localhost:${port}`));
