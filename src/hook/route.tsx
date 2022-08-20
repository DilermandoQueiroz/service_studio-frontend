import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React from "react";
import useAuth from "./auth";

export function withPublic(Component) {
	return function WithPublic(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		if (auth.user && auth.user.emailVerified) {
			router.replace("/");
			return (
        <>
        <div className="md:animate-spin">
          <p>loading</p>
        </div>
      </>
      )
		}
		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}

export function withProtected(Component) {
	return  function WithProtected(props) {
		const auth = useAuth();
		const router = useRouter();
		const pathname = router.pathname;

		if (!auth.user ) {
			router.replace("/login");
			return (
        <>
          <div className="md:animate-spin">
            <p>loading</p>
          </div>
        </>
      )
		}

		return <Component auth={auth} pathname={pathname} {...props} />;
	};
}