'use strict'

var alexa = require('alexa-sdk');

var handlers = {
    "LaunchRequest": function() {
        var speechText = 'Welcome to this useful skill!',
            repromptText = 'For instructions on what you can say, please say help me.';

        this.emit(':ask', speechText, repromptText);
    },
    "TipIntent": function() {
        var speechText = 'Don\'t eat yellow snow!';

        this.emit(':tell', speechText);
    },
    "AMAZON.HelpIntent": function() {
        var speechText = 'How can I help?'

        this.emit(':ask', speechText, speechText);
    },
    "AMAZON.StopIntent": function () {
        this.emit(':tell', 'Goodbye');
    },
    "AMAZON.CancelIntent": function () {
        this.emit(':tell', 'Goodbye');
    }
};

exports.handler = function(event, context) {
    var alexaInstance = alexa.handler(event, context);

    //alexaInstance.appId = 'amzn1.echo-sdk-ams.app.APP_ID';
    alexaInstance.registerHandlers(handlers);
    alexaInstance.execute();
};
