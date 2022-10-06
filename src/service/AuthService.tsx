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
	getIdToken
} from "firebase/auth";




export const AuthService = {
	loginWithGoogle: async () => {
		const provider = new GoogleAuthProvider();
		try {
			const userCred = await signInWithPopup(getAuth(), provider);
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	logout: async () => {
		await signOut(getAuth());
		destroyCookie(null, "__session")
	},

	createUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await createUserWithEmailAndPassword(getAuth(), email, password);
			await sendEmailVerification(userCred.user, {
				url: "http://localhost:3000",
			});
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	signInUserWithEmailAndPassword: async (email, password) => {
		try {
			const userCred = await signInWithEmailAndPassword(getAuth(), email, password);
			return {
				user: userCred.user,
			};
		} catch (e) {
			return {
				error: e.message,
			};
		}
	},
	resetPassword: async (email) => {
		try {
			await sendPasswordResetEmail(getAuth(), email, { url: "http://localhost:3000/login" });
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
	}
};