const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/u',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use('/login',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));
  app.use('/userdata',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));
  app.use('/usrlobbies',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));
  app.use('/createnewpoll',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));
  app.use('/createnewlobby',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));

  app.use('/createnewlobby',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));

  app.use('/su',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));
  
  app.use('/slogin',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));

  app.use('/suserdata',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));

  app.use('/close',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));
  
  app.use('/clsrlobbies',
  createProxyMiddleware({
   target: 'https://pollapp281907.herokuapp.com/',
   changeOrigin:true,
 }
  ));

  app.use(
    '/bobs',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );


  app.use(
    '/ross',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );

  app.use(
    '/check',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use(
    '/logout',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );

  app.use(
    '/select',
    createProxyMiddleware({
      target: 'https://pollapp281907.herokuapp.com/',
      changeOrigin: true,
    })
  );
  app.use('/delete',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }

  ));

  app.use('/excel',
   createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }
  ));

  app.use('/download',
  createProxyMiddleware({
    target: 'https://pollapp281907.herokuapp.com/',
    changeOrigin:true,
  }
  ))

};

