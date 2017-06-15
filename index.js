'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseadmin.json");
//dsfsdfs
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

 env(__dirname + '/.env');

// [START YourAction]
exports.chromeControl = (request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  var user = app.getUser();
  console.log("user: "+JSON.stringify(user));

  oauth2Client.setCredentials({
    access_token: user.accessToken
  });

  plus.people.get({
  userId: 'me',
  auth: oauth2Client
  }, function (err, response) {
    console.log("g+ err: " + JSON.stringify(err));
    console.log("g+ response: " + JSON.stringify(response));
    // handle err and response
  });

  // Fulfill action business logic
  function responseHandler1 (app) {
    // Complete your fulfillment logic and send a response
    app.ask('Hello, World!');
  }

  const actionMap = new Map();
  actionMap.set('heyhey', responseHandler1);

  app.handleRequest(actionMap);
};
// [END YourAction]

// "use strict";
//
// process.env.DEBUG = "actions-on-google:*";
// const App = require("actions-on-google").ApiAiApp;
// // const express = require("express");
// // const bodyParser = require('body-parser');
// //
// // var server = express();
// // server.use(bodyParser.json());
//
// // server.post("/", function(req, res) {
//
// exports.chromeControl = (req, res) => {
//   const app = new App({req, res});
//   console.log("res: " + res);
//   console.log("Request headers: " + JSON.stringify(req.headers));
//   console.log("Request body: " + JSON.stringify(req.body));
//   console.log("req.body.result.action: "  + req.body.result.action);
//   console.log("req.body.result.action == permsaction ? " + (req.body.result.action == "permsaction"));
//
//   function permsRequest (app) {
//     console.log("got in func???");
//     app.tell("webhook works!!!");
//   }
//
//   let actionMap = new Map();
//   actionMap.set("permsaction", permsRequest);
//   app.handleRequest(actionMap);
// };
// // });
//
// // server.listen(process.env.PORT || 8000, function() {
// //   console.log("Server listening");
// // });
