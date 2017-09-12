'use strict';

var http = require('http');
var url = require('url');
var MailboxRequestHandler = require('./MailboxRequestHandler').MailboxRequestHandler;

function setCorsHeaders(response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, DELETE, POST');
    response.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
}

var messageHandlers = {
    'inbox': new MailboxRequestHandler(),
    'outbox': new MailboxRequestHandler()
};

messageHandlers.inbox.mailbox.createMessage('John-E5@gmail.com','Me','2014.05.12','NO DISASSEMBLE!');
messageHandlers.inbox.mailbox.createMessage('Alice@exelon.com','Me','2014.05.12','New Designs - more tweaks');
messageHandlers.inbox.mailbox.createMessage('Sarah@nokia.com','Me','2014.05.12','Sabbatical');
messageHandlers.inbox.mailbox.createMessage('SEK@avclub.com','Me','2014.05.12','Hodor?');
messageHandlers.inbox.mailbox.createMessage('Megan@nowelphoto.com','Me','2014.05.12','Prints');

messageHandlers.outbox.mailbox.createMessage('Me','John-E5@gmail.com','2014.05.12','Disassemble?');
messageHandlers.outbox.mailbox.createMessage('Me','Alice@exelon.com','2014.05.12','Project Completion');
messageHandlers.outbox.mailbox.createMessage('Me','Sarah@nokia.com','2014.05.12','Follow up');
messageHandlers.outbox.mailbox.createMessage('Me','SEK@avclub.com','2014.05.12','Game of Thrones Season 4');
messageHandlers.outbox.mailbox.createMessage('Me','Megan@nowellphoto.com','2014.05.12','Prints');
messageHandlers.outbox.mailbox.createMessage('Me','MariaBurnham@gmail.com','2014.05.12','RSVP: Midsummer Nights Dream');

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url);
    var pathEnd = parsedUrl.pathname.lastIndexOf('/') !== 0 ? parsedUrl.pathname.lastIndexOf('/') : parsedUrl.pathname.length;
    var path = parsedUrl.pathname.substring(1, pathEnd);

    console.log('handling request for ' + path + ' ' + request.method);

    setCorsHeaders(response);
    var messageHandler = messageHandlers[path];
    if(messageHandler){
        messageHandler[request.method](request, response);
    }else{
        response.writeHead(204);
        response.end();
    }
});

server.listen(3000, function(){
    console.log('listening for connections on port 3000');
});