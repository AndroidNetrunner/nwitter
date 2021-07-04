import React, {useEffect, useState} from "react";
import AppRouter from "./Router"
import {authService} from "../myBase";
const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        if (user.displayName === null)
        user.updateProfile({
          displayName:"Anonymous",
        });
        setIsLoggedIn(true);
        setUserObj(user);
      }
      else
      {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Loading..."}
    </div>
  );
}

export default App;
