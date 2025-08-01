

/*
let currentDateTime = new Date(1728959326215)
let currentDateTimeMilli = currentDateTime.getTime();
let postDateTime = new Date(1728959326215);
let postDateString = postDateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " at " + postDateTime.toLocaleTimeString();
let postTimeString = postDateTime.toLocaleTimeString();
let sharedPostDateTime = null;
*/

// Minimum millis over 1 second
const SECONDS_MILLIS = 1000;

// Minimum millis over 60 seconds
// Display minutes above this
const MINUTES_MILLIS = 60000;

// Minimum millis over 60 minutes
// Display hours above this
const HOURS_MILLIS = 3600000;

// Minimum millis over 24 hours
// Display days above this
const DAYS_MILLIS = 86400000;

// Minimum millis over 7 days
// Display weeks above this
const WEEKS_MILLIS = 604800000;

// Minimum millis over 30 days
// Display months above this
const MONTH_MILLIS = 2592000000;

// Minimum millis over 12 months
// Display years above this
const YEAR_MILLIS = 31104000000;

export const getDisplayDate = (postTimestamp) => {
    // currentDateTime
    // 1731483586275
    // postDateTime
    // 1728959326215
    let currentTimestamp = new Date().getTime();

    let diff = currentTimestamp - postTimestamp
    console.log(diff);

    if(diff >= YEAR_MILLIS) {
        return displayInYears(diff);
    } else if(diff >= WEEKS_MILLIS) {
        return displayInWeeks(diff);
    } else if (diff >= DAYS_MILLIS) {
        return displayInDays(diff)
    } else if (diff >= HOURS_MILLIS) {
        return displayInHours(diff);
    } else if (diff >= MINUTES_MILLIS) {
        return displayInMinutes(diff);
    } else if (diff >= SECONDS_MILLIS || diff <= 1000) {
        return displayInSeconds(diff);
    } else {
        return "ERROR";
    }
}

const displayInSeconds = (diff) => {
    console.log("displayInSeconds");
    let secs = Math.floor(diff / SECONDS_MILLIS)
    if(secs === 0) {
        secs = 1;
    }

    return secs + "s";
}

const displayInMinutes = (diff) => {
    console.log("displayInMinutes");
    return Math.floor(diff / MINUTES_MILLIS) + "m";
}

const displayInHours = (diff) => {
    console.log("displayInHours");
    return Math.floor(diff / HOURS_MILLIS) + "h";
}

const displayInDays = (diff) => {
    console.log("displayInDays");
    return Math.floor(diff / DAYS_MILLIS) + "d";
}

const displayInWeeks = (diff) => {
    console.log("displayInWeeks");
    return Math.floor(diff / WEEKS_MILLIS) + "w";
}

const displayInYears = (diff) => {
    console.log("displayInYears");
    return Math.floor(diff / YEAR_MILLIS) + "y";
}

let result = getDisplayDate();
console.log(result);