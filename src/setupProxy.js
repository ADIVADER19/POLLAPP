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

  app.use('/su',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));
  
  app.use('/slogin',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

  app.use('/suserdata',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

  app.use('/close',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));
  
  app.use('/clsrlobbies',
  createProxyMiddleware({
   target: 'http://localhost:2000',
   changeOrigin:true,
 }
  ));

  app.use(
    '/bobs',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );


  app.use(
    '/ross',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );

  app.use(
    '/check',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use(
    '/logout',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );

  app.use(
    '/select',
    createProxyMiddleware({
      target: 'http://localhost:2000',
      changeOrigin: true,
    })
  );
  app.use('/delete',
   createProxyMiddleware({
    target: 'http://localhost:2000',
    changeOrigin:true,
  }

  ));

};

