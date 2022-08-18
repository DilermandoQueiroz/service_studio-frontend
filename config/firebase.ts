import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAb0EvbZPMBEqhm0V4zY_0f28evf3Vq9A4",
    authDomain: "easeservice-8a828.firebaseapp.com",
    projectId: "easeservice-8a828",
    storageBucket: "easeservice-8a828.appspot.com",
    messagingSenderId: "375470847270",
    appId: "1:375470847270:web:295bf6c91aef2098fd7de7"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth()