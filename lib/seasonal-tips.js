'use strict'

var _ = require('lodash');

const tips = {
    'SPRING': [
        'Consider replacing your air filters.',
        'Remember to reprogram your thermostat for warmer weather.'
    ],
    'SUMMER': [
        'Turn up the temperature setting on your thermostat to save energy. 78 is great!',
        'Remember to reprogram your thermostat for warmer weather.',
        'Avoid using your oven. Try grilling outdoors or making cold dishes to cool off.',
        'Doing laundry or running the dishwasher during the day generates heat. Consider putting those activities until the evening.',
        'Plan outdoor or group activities at friend\'s houses and remember to turn off the air conditioning at home to save energy.'
    ],
    'FALL': [
        'Remember to reprogram your thermostat for cooler weather.',
        'As it gets colder out, insulating or weatherproofing your windows can save a lot of energy.',
        'Considering leaving your windows open instead of running the heater or air conditioner.',
        'See if weather stripping on windows or doors should be replaced.',
        'A reminder that replacing your windows with newer, energy-efficient glass may be with considering.'
    ],
    'WINTER': [
        'Check for drafty windows and replace insulation where cold air is seeping in',
        'Turn down the temperature setting on your thermostat at night while you are in bed.',
        'Remember to reprogram your thermostat for cooler weather.',
        'Consider replacing your air filters.'
    ]
};

function getRandomTip(tips) {
    return tips[getRandom(0, tips.length)];
}

function getRandom(lowerInclusive, upperExclusive) {
    return Math.floor(
        Math.random() * (upperExclusive - lowerInclusive) + lowerInclusive
    );
}

function translateSeasonName(seasonName) {
    if (seasonName.toUpperCase() === 'AUTUMN') {
        return 'FALL';
    }
    return seasonName;
}

module.exports.getTipTextForSeason = function(seasonName) {
    if(!seasonName) {
        return undefined;
    }

    // handle autumn -> fall
    seasonName = translateSeasonName(seasonName);

    if(!_.includes(_.keys(tips), seasonName.toUpperCase())) {
        return undefined;
    }

    return 'Here is a tip for '
        + seasonName.toLowerCase()
        + '. '
        + getRandomTip(tips[seasonName.toUpperCase()]);
};
