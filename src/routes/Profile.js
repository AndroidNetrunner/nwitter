import React, { useEffect } from "react";
import { authService, dbService } from "../myBase";
import { useHistory } from "react-router";

export default ({userObj}) => {
	const history = useHistory();
	const onLogoutClick = () => {
		authService.signOut();
		history.push("/");
	}
	const getMyNweets = async () => {
		const nweets = await dbService.collection("nweets").where("author", "==", userObj.uid).orderBy("date", "desc").get();
		console.log(nweets.docs.map(doc => doc.data()));
	}
	useEffect(() => {
		getMyNweets();
	}, [])
	return (
	<>
	<span>Profile</span>
	<br />
	<button onClick={onLogoutClick}>Sign out</button>
	</>
	);
};