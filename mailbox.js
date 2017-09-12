'use strict';

var loremIpsum = require('lorem-ipsum');
var uuid = require('node-uuid');
var _ = require('underscore');

function Mailbox(){
    this.messages = [];
}

Mailbox.prototype.createMessage = function(sender, recipient, date, subject, body){
    var message = {
        id : uuid.v4(),
        sender: sender, recipient: recipient,
        dateSent: date, subject: subject,
        body: body || loremIpsum({count: 25})
    };

    this.messages.push(message);
    return message;
};

Mailbox.prototype.deleteMessage = function(id){
    var message = _.findWhere(this.messages, {id: id});
    this.messages = _.without(this.messages, message);
};

Mailbox.prototype.findMessage = function(id) {
    var message = _.findWhere(this.messages, {id: id});
};

exports.Mailbox = Mailbox;
