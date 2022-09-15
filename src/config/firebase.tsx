import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDu1kuCocON2dA76OVYXmiGxACMqlDUoMU",
  authDomain: "ease-service-f6352.firebaseapp.com",
  projectId: "ease-service-f6352",
  storageBucket: "ease-service-f6352.appspot.com",
  messagingSenderId: "841452146425",
  appId: "1:841452146425:web:b6f78369aa773dd0759c28",
  measurementId: "G-2BDR2N9HTQ"
};

const app = initializeApp(firebaseConfig)
// export const auth = getAuth()