import firebase from "firebase/app";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {setCookie} from 'nookies'
import useAuth from "../hook/auth";

export default function AuthStateChanged({ children }) {
	const { setUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if(user) {
				user.getIdToken()
				.then((token) => {
					setCookie(children, '__session', token, {domain: 'localhost', path: '/', sameSite: "Strict"})
				}) 
				setUser(user);
			} else {
				setUser(null)
			}
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
}