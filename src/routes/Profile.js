import React from "react";
import { authService } from "../myBase";
import { useHistory } from "react-router";

export default () => {
	const history = useHistory();
	const onLogoutClick = () => {
		authService.signOut();
		history.push("/");
	}
	return (
	<>
	<span>Profile</span>
	<br />
	<button onClick={onLogoutClick}>Sign out</button>
	</>
	);
};