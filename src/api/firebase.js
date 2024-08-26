import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth/web-extension";

const firebaseConfig = {
  apiKey: "AIzaSyCcVea50aynG8SxxQ2G2_3FZ_mKMivHZKc",
  authDomain: "timer-online.firebaseapp.com",
  projectId: "timer-online",
  storageBucket: "timer-online.appspot.com",
  messagingSenderId: "113331320840",
  appId: "1:113331320840:web:ffdf55120251427889f9bd",
  measurementId: "G-C1HC9WXBM6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { auth, provider }