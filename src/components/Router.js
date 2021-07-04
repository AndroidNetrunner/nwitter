import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
export default ({isLoggedIn, userObj}) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Switch>
				{isLoggedIn ? <><Route exact path="/" render={()=> <Home userObj={userObj} />} /><Route exact path="/profile" render={()=> <Profile userObj={userObj} />} /></> : <Route exact path="/" component={Auth} />}
			</Switch>
		</Router>
	)
};