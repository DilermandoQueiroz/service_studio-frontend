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

		if (!auth.user || !auth.user.emailVerified) {
			router.replace("/login");
			return (
        <>
          <div className="md:animate-spin">
            <p>loading opa</p>
          </div>
        </>
      )
		}

		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}