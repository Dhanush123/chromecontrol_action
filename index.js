"use strict";

process.env.DEBUG = "actions-on-google:*";
const App = require("actions-on-google").ApiAiApp;
const env = require("node-env-file");

const admin = require("firebase-admin");

const google = require("googleapis");
var plus = google.plus("v1");
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

env("./.env");

// [START YourAction]
exports.chromeControl = (request, response) => {

  var action = "";
  const app = new App({
    request,
    response
  });
  //change

  //console.log("Request headers: " + JSON.stringify(request.headers));
  console.log("Request body: " + JSON.stringify(request.body));
  console.log("api.ai action was: " + request.body.result.action);
  action = request.body.result.action;

  var user = app.getUser();
  oauth2Client.setCredentials({
    access_token: user.accessToken
  });

  var gUser;

  if (admin.apps.length == 0) {
    console.log("should initialize firebase now...");
    admin.initializeApp({
      credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "chromecontrol-77635",
        "private_key_id": "1cf7462f75b52ceb28da3a0b0a3294a2c2396acf",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDFShVnJDapWcq9\nAIj/ntLO54HE0n5KknlO1BQJI/qbg6R1J/fzCtCv5j2TKfoPDf0HYgGjm6ag3gKq\nXOTMEofla8gFoG2LOjsw5X0MOBhGtqgZBFt7BnhoxHyK+PUD9NL50CdVDeAWz5/w\nTATz9vf1Bl8Ynxr0Jtf3u+KyHxICvoBUp/H0O7RKbXNEKpWpO0DcshhPjnPZW1oK\ni/XGEo9vzN9Nb6avkEumjjP963HvWVN+Ca7nRpZkKKMxb+Jf9S73FdSYur+RqJ1R\naJmbCtDteN8boRwElMNjJ90H6Sj1uimbzcCoBRlhvroE7nabznQS8piZuJp7Y1A8\nAM5nn3AvAgMBAAECggEAHsByHvDuxu2aGQ/GSvc6AMo72K6+xLzuxQdwVWRoTGlJ\nRIGwYmU4gNKF8onD0n4/BzGS89Tv33n7jGE3wJ9600Xo7bJDS5pjXjcci2pgTlVr\nqkqa6ng9uIbiqtQszNW9NPc/H5YuwconMfuHd3JIKsc4IiGwFTJ2I3AD4U56g4wM\nE2vm+ZwtybhrjNyMUxu1KpD/bje6rTWwbfhxnT25tBm2b9kofnBFmTaKyEMl7pyA\npqX4P/h/HJTf6+8vw9sWsepDkcMdqqaSlxZW+tuDNNZQ5NwUhW9Ds+7jhIhAf20x\no+rTi2Fwdgzx84SDKzMAHz3wMJD2iSTpoYx7A0qFAQKBgQDlA2wc4OsGlTf3WhN+\nOcPjVuIA4+qowUFOD27hUhvjLFnvhstso4xgzt2peoWsCvp07YfedIDHtA0XpAZm\ncIGzCAwXuQ0JSU7SqENPGK3iZqX2JaNCF3xBVb9qJs1nu0lQao4se+TP7wvbaoOh\neTuf7yJi5DvcVeAs16Cmwa9O7wKBgQDciadMRlexnqqEfIHRqMUpm4LSdREeHuRt\nOUIUU8Tpqm2kzmudetiyFdo928di+fp6tjuBeevWriLzTHpZU2/x9anR0tSadGrm\n3toO4rubs6TOQCEReNq7E5MhyCMp3yl3aZKGgDzK+QmC9EWtB2urAFwYJErC8FCH\nwXJvU5nywQKBgF+kYEBnRoBHTUpGGiH7Ke4F2PkaNmQn4YgiNeJwEil72kuIdeh3\nHSdI/ZXMD4tcQmEW2klzSl0cuuMGo42gquoEEFjP9bvNG9gqYYHlAqmsyN7VtSri\n+AepMfm5HsuVkfa9qYa2b0bPxJnsD/Ed2mLe0fOO8dkBHFBd9T/vX7GNAoGAN4mS\nz+qG+vvyBRs1tg7CWBAJieZhQSyWacsZkPTnidCZe/9fqnDdUTufkiReudYp9e0e\nXyTM92sy8gI4bXZNoqky8twdHihjI3DLiSQgCr3aqvYLXdMJgkMTslYsRMcmMiQr\n+iMhLBw7APdy9HgB7TZR+uJo0V6jaQyWPOLYygECgYEA2FM6IKvme4qHrWKjc2Ea\nADSzeOXcQNcfHAHkcy/WBL4DnAioFafrFph8gC8y56rqt+KQozMaLCu7w+kUAvse\nKps4BdMf+o9f1JOZCiYtNhtVY7awmJqZV5vkJIqSGjWH0YC7ih2fK+l/d4s/QdJa\nE8fJDjuzVkykNDHcrkQ5JFo=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-d9oww@chromecontrol-77635.iam.gserviceaccount.com",
        "client_id": "111491298000295741038",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d9oww%40chromecontrol-77635.iam.gserviceaccount.com"
      }),
      databaseURL: "https://chromecontrol-77635.firebaseio.com"
    });
  }

  function getGUser(opFunc, app) {
    plus.people.get({
      userId: "me",
      auth: oauth2Client
    }, function(err, res) {
      console.log("g+ err: " + JSON.stringify(err));
      console.log("g+ res: " + JSON.stringify(res));
      gUser = res;
      console.log("gUser.displayName: " + gUser.displayName);
      console.log("gUser.emails[0].value: " + gUser.emails[0].value);
      console.log("gUser.id: " + gUser.id);
      if (typeof opFunc === "function") {
        opFunc(app);
      }
    });
  }

  function checkUserInFB(app) {
    var ref = admin.database().ref("users");
    ref.once("value", function(snapshot) {
      console.log("snapshot (checkuser): " + JSON.stringify(snapshot.val()));
      if (!snapshot.val()[gUser.id]) {
        console.log("will have to create new user...")
        fbCreateUser(app);
      } else {
        console.log("user already exists in Firebase!");
        checkChromeStatus(app);
      }
    }, function(errorObject) {
      console.log("Firebase user (creation) read failed: " + errorObject.code);
    });
  }

  function fbCreateUser(app) {
    var gRef = admin.database().ref("users/" + gUser.id);
    gRef.set({
      username: gUser.displayName,
      email: gUser.emails[0].value,
      chromeLoggedIn: false,
      command: "none"
    }, function(error) {
      if (error) {
        console.log("Data could not be saved (user create): " + error);
      } else {
        checkChromeStatus(app);
      }
    });
    console.log("created new user in Firebase");
  }

  function checkChromeStatus(app) {
    var ref = admin.database().ref("users");
    var displayMsg;
    ref.once("value", function(snapshot) {
      console.log("snapshot: " + JSON.stringify(snapshot.val()));
      console.log("snapshot.val()[" + gUser.id + "].chromeLoggedIn: " + snapshot.val()[gUser.id].chromeLoggedIn);
      if (!snapshot.val()[gUser.id].chromeLoggedIn) {
        displayMsg = "Hey! It seems like you haven't installed the \"Browser Control\" Chrome Extension in your Google Chrome browser yet. Please come back after you've done that. Thank you!";
        app.tell(displayMsg);
      } else {
        var gRef = admin.database().ref("users/" + gUser.id);
        var params = {"command": action};
        switch (action) {
          case "close_tab":
            displayMsg = "Closing tab!";
            break;
          case "go_back":
            displayMsg = "Going back!";
            break;
          case "go_forward":
            displayMsg = "Going forward!";
            break;
          case "new_tab":
            displayMsg = "Opening new tab!";
            break;
          case "scroll_up":
            displayMsg = "Scrolling up!";
            break;
          case "scroll_up_full":
            displayMsg = "Scrolling all the way up!";
            break;
          case "scroll_down":
            displayMsg = "Scrolling down!";
            break;
          case "scroll_down_full":
            displayMsg = "Scrolling all the way down!";
            break;
          case "create_bookmark":
            displayMsg = "Bookmarking your current tab!";
            break;
          case "reload_page":
            displayMsg = "Reloading tab now!";
            break;
          case "show_links":
            displayMsg = "Showing all links on page now!";
            break;
          case "remove_links":
            displayMsg = "Removing page highlighting now!";
            break;
          case "restore_window":
            displayMsg = "Restoring the most recently closed window!";
            break;
          case "sites_search":
            if (typeof request.body.result.parameters.any !== "undefined") {
              console.log("api.ai sites_search query: " + request.body.result.parameters.any);
              params.siteQuery = request.body.result.parameters.any;
            }
            displayMsg = "Opening " + request.body.result.parameters.siteName + " now!";
            params.siteName = request.body.result.parameters.siteName;
            break;
          case "zoom":
            var zoom = request.body.result.parameters.zoom;
            console.log("api.ai zoom query: " + zoom);
            params.zoomType = zoom;
            displayMsg = "Zooming " + zoom + " now!";
            break;
          case "website_search":
            var url = request.body.result.parameters.url;
            console.log("api.ai website search url query: " + url);
            params.websiteUrl = url;
            displayMsg = "Going to " + url + " now!";
            break;
          case "open_link":
            var linkNum = request.body.result.parameters.link_number;
            console.log("api.ai linkNum query: " + linkNum);
            params.linkNumber = linkNum;
            displayMsg = "Opening link " + linkNum + " now!";
            break;
          case "close_window":
            var windowType = request.body.result.parameters.window;
            console.log("api.ai windowType query: " + windowType);
            params.windowType = windowType;
            if(windowType == "current"){
              displayMsg = "Closing current window now!";
            }
            else {
              displayMsg = "Closing all windows now!"; //windowType is either current or all
            }
            break;
          default:
            app.tell("I appreciate the enthusiasm, but I don't think this is a feature my creator has given me yet! You can ask my creator to implement it by emailing the developer email found in the Browser Control Google Actions listing.");
        }
        app.ask(displayMsg + " What else can I do for you on Chrome?",getSampleCommands());
        gRef.update(params, function(error) {
          if (error) {
            console.log("Data could not be saved: " + error);
            app.tell("Unfortunately I wasn't able to connect to the Browser Control database right now. Please try again later.");
          }
        });
      }
    }, function(errorObject) {
      console.log("Firebase user (read) read failed: " + errorObject.code);
    });
  }

  function funcController(app) {
    var msg = getGUser(checkUserInFB, app);
  }

  function getSampleCommands() {
    var listy = [
     "You can say something like: open new tab, zoom in, or search YouTube for cat videos",
     "You can say something like: refresh page, go back, or scroll down",
     "You can say something like: go to facebook.com, bookmark this page, or scroll all the way up",
     "You can say something like: close tab, go forward, or search Google for how to fix a flat tire",
     "You can say something like: highlight all links on page, click on link 2, or remove links highlighting",
     "You can say something like: restore last window, close current window, or search StackOverflow for Android RelativeLayout",
     "You can say something like: zoom in, zoom out, or close all windows"
    ];
    listy.sort(function(a, b){return 0.5 - Math.random()}); //https://www.w3schools.com/js/js_array_sort.asp
    var subList = listy.slice(0,2);
    subList[2] = "Thank you for using Chrome Control. Talk to you later!"
    return subList;
  }

  function greetUser(app) {
    console.log("in greetUser function!!!!");

    var mainGreets = [
      "Hi! What action do you want to take on Chrome?",
      "Hello! How do you want to use Chrome?",
      "Hey! How can I help you use Chrome?",
      "Greetings! What would you like to do on Chrome today?"
    ];

    app.ask(mainGreets[Math.floor(Math.random() * 4)], getSampleCommands()); //Math.floor(Math.random() * (max - min + 1)) + min <-- from Mozilla
  }

  function unknownHandle(app) {
    app.ask("I apologize. Currently I don't know to help you " + app.getRawInput() + "on Chrome. I'm constantly learning new actions, so please try again later if you intended to request that action. What other action can I help you take on Chrome?");
  }

  const actionMap = new Map();
  actionMap.set("close_tab", funcController);
  actionMap.set("go_back", funcController);
  actionMap.set("go_forward", funcController);
  actionMap.set("new_tab", funcController);
  actionMap.set("scroll_down", funcController);
  actionMap.set("scroll_down_full", funcController);
  actionMap.set("scroll_up", funcController);
  actionMap.set("scroll_up_full", funcController);
  actionMap.set("sites_search", funcController);
  actionMap.set("zoom", funcController);
  actionMap.set("website_search", funcController);
  actionMap.set("create_bookmark", funcController);
  actionMap.set("reload_page", funcController);
  actionMap.set("show_links", funcController);
  actionMap.set("open_link", funcController);
  actionMap.set("remove_links", funcController);
  actionMap.set("close_window", funcController);
  actionMap.set("restore_window", funcController);
  actionMap.set("input.welcome", greetUser);
  actionMap.set("input.unknown", unknownHandle);
  app.handleRequest(actionMap);
}
// [END YourAction]
