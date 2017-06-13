"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
const express = require("express");

var server = express();
// [START YourAction]
server.post('/hook', function(req, res) {
  const app = new App({req, res});
  console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));

  // Fulfill action business logic
  function permsRequest (app) {
    const permission = app.SupportedPermissions.NAME;
    app.askForPermission("To link your device to your Google Chrome browser", permission);
  }

  const actionMap = new Map();
  actionMap.set("permsaction", permsRequest);

  app.handleRequest(actionMap);
});

server.get('/auth/google',
  passport.authenticate('google', { scope:
  	['https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

server.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

server.listen(8000, function() {
  console.log('Server listening');
});
