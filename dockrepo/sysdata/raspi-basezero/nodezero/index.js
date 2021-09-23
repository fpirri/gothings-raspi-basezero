var express = require('express'),
    http = require('http'),
    ip = require('ip');

var app = express()
  , nome = 'node-test-server-main'
  , nota = ''
  , counter = 0
  , srvaddr = ip.address()
  , srvport = '3000'
  ;
        
//console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
console.log('Versione: '+ nome );

app.use(function(req, res, next){//  preparazione risposta 
  nota = req.originalUrl;
  console.log('Container '+ nome +' at ip address: ' + srvaddr+ ' - req.Url: '+ nota);
	next();
});

app.get('/main', function(req, res, next) {
  counter++;
  res.send( '<br><h1>MAIN service dynamic homepage</h1><hr>'
    + '<hr><br> I am a simple node js application <br><br>'
    + '<br> I count how many times I were called <br><br><hr>'
    + '<hr><br> The page counter is now ' + counter + '<br><br><hr>' 
    + '<hr><br> This response comes from '+ nome
    + '<br> Docker container name: ' + process.env.HOSTNAME
    + '<br> Container ip address: ' + srvaddr
    + '<br><br><hr>'
    );
  });

app.all('*', function(req, res, next){
  res.send(
        '<hr><br> Service '+ nome + ' received the request: <br>'+ nota +'<br>'
      + '<br><hr>' 
  );
});

app.get('/error', function(req, res, next){// segnala gli errori
	next(new Error('An error occurred on '+ nome ));
});

// Creadte HTTP server
http.createServer(app).listen(srvport, function() {
  console.log('Listening on port ' + (process.env.PORT || 'boh'));
  console.log('Container ip address: ' + srvaddr);
  console.log('this is the main server in nodebase');
});
