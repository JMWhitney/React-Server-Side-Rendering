const express = require('express');
const next = require('next');

//config variables
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';


const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();
    
    //The following two routes are not strictly necessary.
    //Next will automatically create the routes to serve
    //The react templates contained in /pages.
    //However, you can alias the urls by defining the routes here.    
    server.get('/page2', (req, res) => {
      return app.render(req, res, '/page2');
    });

    server.get('/page3', (req, res) => {
      return app.render(req, res, '/example');
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Ready on http://localhost:${port}`);
    });
})