'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const env = require('node-env-file');

const admin = require("firebase-admin");

const google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

env('./.env');

// [START YourAction]
exports.chromeControl = (request, response) => {
  
  var action = "";
  const app = new App({
    request,
    response
  });
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));
  console.log("api.ai action was: " + request.body.result.action);
  action = request.result.action;
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

  function getGUser(opFunc) {
    plus.people.get({
      userId: 'me',
      auth: oauth2Client
    }, function(err, res) {
      console.log("g+ err: " + JSON.stringify(err));
      console.log("g+ res: " + JSON.stringify(res));
      gUser = res;
      console.log("gUser.displayName: " + gUser.displayName);
      console.log("gUser.emails[0].value: " + gUser.emails[0].value);
      console.log("gUser.id: " + gUser.id);
      if (typeof opFunc === "function") {
        opFunc();
      }
    });
  }

  function checkUserInFB() {
    var ref = admin.database().ref("users");
    ref.on("value", function(snapshot) {
      console.log("snapshot (checkuser): " + JSON.stringify(snapshot.val()));
      if (!snapshot.val()[gUser.id]) {
        console.log("will have to create new user...")
        fbCreateUser();
      } else {
        console.log("user already exists in Firebase!");
        return checkChromeStatus();
      }
    }, function(errorObject) {
      console.log("Firebase user (creation) read failed: " + errorObject.code);
    });
  }

  function fbCreateUser() {
    var gRef = admin.database().ref("users/" + gUser.id);
    gRef.set({
      username: gUser.displayName,
      email: gUser.emails[0].value,
      chromeLoggedIn: false,
      command: "none"
    },function(error) {
        if (error) {
          console.log("Data could not be saved (user create): " + error);
        } else {
          return checkChromeStatus();
        }
      });
    console.log("created new user in Firebase");
  }

  function checkChromeStatus() {
    var ref = admin.database().ref("users");
    ref.on("value", function(snapshot) {
      console.log("snapshot: " + JSON.stringify(snapshot.val()));
      console.log("snapshot.val()[" + gUser.id + "].chromeLoggedIn: " + snapshot.val()[gUser.id].chromeLoggedIn);
      if(!snapshot.val()[gUser.id].chromeLoggedIn){
        app.tell("Hey! It seems like you haven't installed the \"Chrome Control\" Chrome Extension in your Google Chrome Browser yet. Can you come back after you've done that? U+1F642");
      }
      else {
        app.tell("Hey, you're logged in to Chrome!");
      }
    }, function(errorObject) {
      console.log("Firebase user (read) read failed: " + errorObject.code);
    });
  }

//  function testFunc(app) {
//    app.ask("Wow, you found the developer test function. Lucky you!");
//  }
//
//  function closeTab(app) {
//    getGUser(checkChromeStatus(function() {
//      var gRef = admin.database().ref("users/" + gUser.id);
//      gRef.update({
//        "command": "close_tab"
//      },function(error) {
//        if (error) {
//          console.log("Data could not be saved: " + error);
//        } else {
//          app.ask("Closing tab! Let me know if you want me to do anything else.");
//        }
//      });
//    }));
//  }
//
//  function goBack(app) {
//    getGUser(checkChromeStatus, function(){
//      var gRef = admin.database().ref("users/" + gUser.id);
//      gRef.update({
//        "command": "go_back"
//      },function(error) {
//        if (error) {
//          console.log("Data could not be saved: " + error);
//        } else {
//          app.ask("Going back! Let me know if you want me to do anything else.");
//        }
//      });
//    });
//  }
//
//  function goForward(app) {
//    getGUser(checkChromeStatus, function() {
//      var gRef = admin.database().ref("users/" + gUser.id);
//      gRef.update({
//        "command": "go_forward"
//      },function(error) {
//        if (error) {
//          console.log("Data could not be saved: " + error);
//        } else {
//          app.ask("Going forward! Let me know if you want me to do anything else.");
//        }
//      });
//    });
//  }
//
//  function newTab(app) {
//    getGUser(checkChromeStatus, function() {
//      var gRef = admin.database().ref("users/" + gUser.id);
//      gRef.update({
//        "command": "new_tab"
//      },function(error) {
//        if (error) {
//          console.log("Data could not be saved: " + error);
//        } else {
//          app.ask("Opening new tab! Let me know if you want me to do anything else.");
//        }
//      });
//    });
//  }
//
//  function scrollDown(app) {
//    app.ask("Scrolling down! Let me know if you want me to do anything else.");
//    getGUser(checkChromeStatus);
//    var gRef = admin.database().ref("users/" + gUser.id);
//    gRef.update({
//      "command": "scroll_down"
//    });
//  }
//
//  function scrollUp(app) {
//    app.ask("Scrolling up! Let me know if you want me to do anything else.");
//    getGUser(checkChromeStatus);
//    var gRef = admin.database().ref("users/" + gUser.id);
//    gRef.update({
//      "command": "scroll_up"
//    });
//  }
  
  function funcController(app) {
    getGUser(checkUserInFB);
  }

  const actionMap = new Map();
  actionMap.set('test_func', funcController);
  actionMap.set('close_tab', funcController);
  actionMap.set('go_back', funcController);
  actionMap.set('go_forward', funcController);
  actionMap.set('new_tab', funcController);
  actionMap.set('scroll_down', funcController);
  actionMap.set('scroll_up', funcController);

  app.handleRequest(actionMap);
}
// [END YourAction]