const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/u',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use('/login',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));
  app.use('/userdata',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));
  app.use('/usrlobbies',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));
  app.use('/createnewpoll',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));
  app.use('/createnewlobby',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));

  app.use('/createnewlobby',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

  app.use('/lobs',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

  app.use('/bobs',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));
  
  app.use('/ross',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

};