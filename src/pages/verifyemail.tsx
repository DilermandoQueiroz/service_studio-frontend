import React, { useEffect, useRef, useState } from "react";
import { withProtected } from "../hook/route";



const VerifyEmail = ({ auth, pathname }) => {

	const { user, error } = auth;

	const [num, setNum] = useState(0);

  useEffect(() => {
    async function getToken() {
      const result = await user.getIdToken();

      setNum(result);
    }

    getToken();
  }, []);


	return (
		<div>
			{error?.[pathname] && <h4 style={{ color: "red" }}>{error[pathname]}</h4>}
			<h1>{user.uid}</h1>
			<div className="container">
			<h1>{num}</h1>
			</div>
			<h1>{user.emailVerified ? "Verified" : "not verified"}</h1>
		</div>
	);
}

export default withProtected(VerifyEmail)