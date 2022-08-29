import { useRouter } from "next/router";
import React from "react";
import useAuth from "./auth";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		// if (auth.user && auth.user.emailVerified) {
		// 	router.replace("/");
		// 	return <h1>Loading...</h1>;
		// }
		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}

export function withProtected(Component) {
	return  function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		if (!auth.user) {
			router.replace("/login");
			return (
        <>
          <div className="md:animate-spin">
            <p>loading opa</p>
          </div>
        </>
      )
		}

		// if (!auth.user.emailVerified) {
		// 	console.log("cat no email não verificado")
		// 	return (
		// 		<>
		// 			<div className="md:animate-spin">
		// 				<p>vá validar seu e-mail imundiça</p>
		// 			</div>
		// 		</>
		// 	)
		// }

		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}