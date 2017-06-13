"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;

// [START YourAction]
exports.chromeControl = (request, response) => {
const app = new App({request, response});
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
};
