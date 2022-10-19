import {destroyCookie} from 'nookies'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";




export const AuthService = {
	loginWithGoogle: async () => {
		const provider = new GoogleAuthProvider();
		try {
			const userCred = await signInWithPopup(getAuth(), provider);
			return {
				userCred: userCred,
				success: true
			}
		} catch (e) {
			return {
				error: e,
				success: false
			}
		}
	},
	logout: async () => {
		await signOut(getAuth());
		destroyCookie(null, "__session")
	},

	createUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await createUserWithEmailAndPassword(getAuth(), email, password);
			sendEmailVerification(userCred.user, {
				url: "http://0.0.0.0:3000/home",
			});
			return {
				userCred: userCred,
				success: true
			}
		} catch (e) {
			return {
				error: e,
				success: false
			}
		}
	},
	signInUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await signInWithEmailAndPassword(getAuth(), email, password);
			return {
				userCred: userCred,
				success: true
			}
		} catch (e) {
			return {
				error: e,
				success: false
			}
		}
	},
	resetPassword: async (email) => {
		try {
			await sendPasswordResetEmail(getAuth(), email);
		} catch (e) {
			return e.message;
		}
	},

	deleteAccount: async () => {
		try {
			await deleteUser(getAuth().currentUser);
		} catch (e) {
			return e.message;
		}
	},
	updatePassword: async (newPassword) => {
		try {
			await updatePassword(getAuth().currentUser, newPassword);
			return "Update successfully";
		} catch (e) {
			return e.message;
		}
	},
	getEmail: async () => {
		try {
			return getAuth().currentUser.email
		} catch (e) {
			return e.message
		}
	},
	getEmailVerified: async () => {
		try {
			return getAuth().currentUser.emailVerified
		} catch (e) {
			return e.message
		}
	},
	sendEmailVerification: (user) => {
		try {
			return sendEmailVerification(user)
		} catch (e) {
			return e.message
		}

	}
};