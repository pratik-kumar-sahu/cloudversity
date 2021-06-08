import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth, provider } from "../firebase";

function RightContainer() {
  const { dispatch } = useContext(AuthContext);

  const googleLoginHandler = () => {
    auth.signInWithPopup(provider).then((data) =>
      dispatch({
        type: "VERIFY_USER",
        payload: data.user,
      })
    );
  };

  return (
    <div className="rightContainer">
      <button onClick={googleLoginHandler}>Login With Google</button>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default RightContainer;
