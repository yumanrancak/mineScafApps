// Import server startup through a single index entry point


import './register-api.js';
import './init.js';

Meteor.startup(function () {
    // process.env.MAIL_URL = ""//removed for SO;

    Accounts.config({
        sendVerificationEmail: false,
        loginExpirationInDays: null
        // forbidClientAccountCreation: true 
    });
});