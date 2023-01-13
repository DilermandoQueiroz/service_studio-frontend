import firebase from "firebase/app";
import {onAuthStateChanged, getAuth} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {setCookie} from 'nookies'
import useAuth from "../hook/auth";

export default function AuthStateChanged({ children }) {
	const { setUser, setStudio } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(getAuth(), async (user) => {
			if(user) {
				user.getIdToken()
				.then((token) => {
					setCookie(children, '__session', token, {domain: window.location.hostname, path: '/', sameSite: "Strict"})
				}) 
				const idTokenResult = await user.getIdTokenResult()
				setStudio(idTokenResult.claims.studio_id)
				setUser(user);
			}
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return children;
}