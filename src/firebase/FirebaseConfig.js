const defaultApiKey = "AIzaSyAfQe2YjUh4yxN6Ax0ooIIgvb9RHGDTTKw";
const defaultAppId = "1:1016116125256:web:21badede89212eb844027d";
const apiKey = ( window._env_ && window._env_.FIREBASE_API_KEY) || defaultApiKey;
const appId = ( window._env_ && window._env_.FIREBASE_APP_ID) || defaultAppId;
const firebaseConfig = {
  // apiKey: "AIzaSyAfQe2YjUh4yxN6Ax0ooIIgvb9RHGDTTKw",
  apiKey,
  authDomain: "coalition-ba367.firebaseapp.com",
  projectId: "coalition-ba367",
  storageBucket: "coalition-ba367.appspot.com",
  messagingSenderId: "1016116125256",
  appId
};

export default firebaseConfig;