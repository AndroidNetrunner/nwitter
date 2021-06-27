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
        setIsLoggedIn(true);
        setUserObj(user);
      }
      else
        setIsLoggedIn(false);
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
