'use strict'

var APP_ID = 'amzn1.ask.skill.5cc7c96d-b14a-40bf-9a69-e49853f133e8',
    AlexaSkill = require('./AlexaSkill'),
    moment = require('moment-timezone'),
    tipsService = require('../lib/seasonal-tips'),
    SeasonalTipsSkill = function() {
        AlexaSkill.call(this, APP_ID);
    };

SeasonalTipsSkill.prototype = Object.create(AlexaSkill.prototype);
SeasonalTipsSkill.prototype.constructor = SeasonalTipsSkill;

SeasonalTipsSkill.prototype.eventHandlers.onSessionStarted = function(request, session) {
    console.log("SeasonalTipsSkill onSessionStarted requestId: "
        + request.requestId
        + ", sessionId: " + session.sessionId);

}

SeasonalTipsSkill.prototype.eventHandlers.onLaunch = function(request, session, response) {
    console.log("SeasonalTipsSkill onLaunch requestId: "
        + request.requestId
        + ", sessionId: " + session.sessionId);

    // get welcome response(response)
    var speechText = 'With seasonal tips, you can get helpful energy savings tips for any season of the year. You can ask for a tip for today, or a tip for any particular season of the year. Which season would like a tip for?',
        repromptText = 'For examples of what you can say, please say help me.';

    response.ask(
        getSSMLSpeech(speechText),
        getSSMLSpeech(repromptText)
    );
}

SeasonalTipsSkill.prototype.eventHandlers.onSessionEnded = function(request, session) {
    console.log("SeasonalTipsSkill onSessionEnded requestId: "
        + request.requestId
        + ", sessionId: " + session.sessionId);
}

function respondTipForCurrentSeason(response) {
    var season = getSeasonForMoment(moment()),
        speechText = tipsService.getTipTextForSeason(season);

    response.tell(getSSMLSpeech(speechText));
}

SeasonalTipsSkill.prototype.intentHandlers = {
    "TipIntent": function(intent, session, response) {
        respondTipForCurrentSeason(response);
    },
    "TipSeasonIntent": function(intent, session, response) {
        var seasonSlot = intent.slots.season;

        if (!seasonSlot) {
            respondTipForCurrentSeason(response);
            return;
        }

        var season = seasonSlot.value,
            speechText = tipsService.getTipTextForSeason(season);

        if (!speechText) {
            respondTipForCurrentSeason(response);
            return;
        }

        response.tell(getSSMLSpeech(speechText));
    },
    "AMAZON.HelpIntent": function(intent, session, response) {
        var speechText = 'Examples of what you can ask are, \'give me a tip\' or \'i want a tip for spring\'';

        response.ask(
            getSSMLSpeech(speechText),
            getSSMLSpeech(speechText)
        );
    },
    "AMAZON.StopIntent": function(intent, session, response) {
        response.tell(getSSMLSpeech('Goodbye'));
    },
    "AMAZON.CancelIntent": function(intent, session, response) {
        response.tell(getSSMLSpeech('Goodbye'));
    }
};

function getSeasonForMoment(moment) {
    if (!moment) {
        return undefined;
    }
    if (moment.month >= 3 && moment.month <= 5) {
        return 'SPRING';
    }
    if (moment.month >= 6 && moment.month <= 8) {
        return 'SUMMER';
    }
    if (moment.month >= 9 && moment.month <= 11) {
        return 'FALL';
    }
    return 'WINTER';
}

function getSSMLSpeech(text) {
    return {
        speech: '<speak>' + text + '</speak>',
        type: AlexaSkill.speechOutputType.SSML
    }
}

exports.handler = function(event, context) {
    var skill = new SeasonalTipsSkill();
    skill.execute(event, context);
};
