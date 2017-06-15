'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
var env = require('node-env-file');

const admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chromecontrol-77635.firebaseio.com"
});
const serviceAccount = require("./firebaseadmin.json");
var db = admin.database();

// var google = require('googleapis');
// var plus = google.plus('v1');
// var OAuth2 = google.auth.OAuth2;
//
// var oauth2Client = new OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URL
// );

env('./.env');

// [START YourAction]
exports.chromeControl = (request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  var user = app.getUser();
  console.log("user: "+JSON.stringify(user));

  var ref = db.ref("/users");
  ref.once("value")
  .then(function(snapshot) {
    var hasAccount = snapshot.hasChild(user.emails.value);
    if(!hasAccount){
      ref.set({ name: user.displayName, email: user.emails.value });
    }
  });

  // oauth2Client.setCredentials({
  //   access_token: user.accessToken
  // });
  //
  // plus.people.get({
  // userId: 'me',
  // auth: oauth2Client
  // }, function (err, response) {
  //   console.log("g+ err: " + JSON.stringify(err));
  //   console.log("g+ response: " + JSON.stringify(response));
  //   // handle err and response
  // });

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
