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
      <Link className="rightContainer__btn" onClick={googleLoginHandler}>
        Login With Google
      </Link>
      <Link className="rightContainer__btn" to="/">
        Home
      </Link>
      <Link className="rightContainer__btn" to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
}

export default RightContainer;
