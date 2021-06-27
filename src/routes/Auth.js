import React, {useState} from "react";
import {authService, fbi} from "../myBase";
const Auth = () => {;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");
	const onChangeEmail = e => {
		setEmail(e.target.value);
	}
	const onChangePassword = e => {
		setPassword(e.target.value);
	}
	const onSubmit = async(e) => {
		e.preventDefault();
		let data;
		try {
		if (newAccount) {
			data = await authService.createUserWithEmailAndPassword(email, password)
		}
		else {
			data = await authService.signInWithEmailAndPassword(email, password);
		}
		console.log(data);
	}
		catch (error) {
			setError(error.message);
		}
	}
	const toggleAccount = () => setNewAccount(prev => !prev);
	const onSocialClick = async (e) => {
		const {target: {name}} = e;
		let provider = new fbi.auth.GoogleAuthProvider();
		await authService.signInWithPopup(provider);
	}

return (
<div>
	<form onSubmit={onSubmit}>
		<input type="email" placeholder="Email" required value={email} onChange={onChangeEmail}/>
		<input type="password" placeholder="password" required value={password} onChange={onChangePassword}/>
		<input type="submit" value={newAccount ? "Create Account": "Log in"}/>
		<br />
		<input onClick={onSocialClick} name="Google" type="submit" value="Sign in with Google"/>
		
	</form>
	<span onClick={toggleAccount}>{newAccount ? "Log in" : "Create Account"}</span>
	<div>{error}</div></div>
	);
};
export default Auth;