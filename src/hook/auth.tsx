import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";
import { AuthService } from "../service/AuthService";

const authContext = createContext<any>({});

export default function useAuth() {
	return useContext(authContext);
}

export function AuthProvider(props) {
	const [user, setUser] = useState(null);
	const [studio, setStudio] = useState(null);
	const [error, setError] = useState({
		pathname: '',
		error: ''
	});

	const router = useRouter();
	const pathname = router.pathname;
	
	const loginWithGoogle = async () => {
		const { error, userCred } = await AuthService.loginWithGoogle();
		if (error) {
			setError({
				pathname: pathname,
				error: error
			});
		}
		setUser(userCred ?? null);
	};

	const logout = async () => {
		await AuthService.logout();
		setUser(null);
	};

	const createUserWithEmailAndPassword = async (email, password) => {
		if (email && password) {
			const { error, userCred } = await AuthService.createUserWithEmailAndPassword(
				email,
				password
			);
			if (error) {
				setError({
					pathname: pathname,
					error: error
				});
				return;
			}
			setUser(userCred ?? null);
			router.push(`/verify?email=${email}`);
		} else {
			setError({
				pathname: pathname,
				error: "Email and password can not be empty"
			});
		}
	};

	const signInUserWithEmailAndPassword = async (email, password) => {
		if (email && password) {
			const { error, userCred } = await AuthService.signInUserWithEmailAndPassword(
				email,
				password
			);
			if (error) {
				setError({
					pathname: pathname,
					error: error
				});
				return;
			}
			setUser(userCred ?? null);
			router.push("/");
		} else {
			setError({
				pathname: pathname,
				error: "Email and password can not be empty"
			});
		}
	};
	const resetPassword = async (email) => {
		if (email) {
			const error = await AuthService.resetPassword(email);
			if (error) {
				setError({
					pathname: pathname,
					error: error
				});
				return;
			}
			router.push(`/verify?email=${email}`);
		} else {
			setError({
				pathname: pathname,
				error: "Email can not be empty"
			});
		}
	};

	const deleteAccount = async () => {
		const error = await AuthService.deleteAccount();
		setError({
			pathname: pathname,
			error: error
		});
	};

	const updatePassword = async (confirmPassword, password) => {
		if (confirmPassword === password) {
			const error = await AuthService.updatePassword(password);
			setError({
				pathname: pathname,
				error: error
			});
		} else {
			setError({
				pathname: pathname,
				error: "password doesn't match!"
			});
		}
	};

	const isOwnerStudio = async () => {
		const studio = await AuthService.isOwnerStudio();
		
	};

	const value = {
		user,
		studio,
		error,
		loginWithGoogle,
		logout,
		setUser,
		setStudio,
		createUserWithEmailAndPassword,
		signInUserWithEmailAndPassword,
		resetPassword,
		deleteAccount,
		updatePassword,
		isOwnerStudio
	};

	return <authContext.Provider value={value} {...props} />;
}