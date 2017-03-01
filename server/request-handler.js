// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var objectId = 1;

var messages = [{
  text: 'first messasge',
  username: 'dm',
  roomname: 'cool dudes',
  objectId: 1
}];

var requestHandler = function(request, response) {
  var statusCode;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.url === '/classes/messages' && request.method === 'GET') {
    var body = {};
    body.results = messages;
    statusCode = 200;
    console.log('get: ', body.results);
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(body));
  } else if (request.url === '/classes/messages' && request.method === 'POST') {

    statusCode = 201;

    var temp = '';

    request.on('data', function(chunk) {
      temp += chunk;
    });

    request.on('end', function() {
      var x = JSON.parse(temp);
      x.objectId = ++objectId;
      messages.push(x);

      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(''));
    });
  } else if (request.url === '/classes/messages' && request.method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

};

//module.exports = requestHandler;
module.exports.requestHandler = requestHandler;
