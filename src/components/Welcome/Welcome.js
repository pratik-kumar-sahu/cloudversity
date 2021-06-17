import React from "react";
import { useHistory } from "react-router";
import images from "../../assets/images";
import "./Welcome.scss";

const { bell } = images;

export function Welcome({ user: { user } }) {
  const { firstName, lastName, profileImg } = user;
  const history = useHistory();

  return (
    <div className="welcome">
      <div className="welcome__greet">
        <img
          className="welcome__greet--userpic"
          src={
            profileImg
              ? profileImg
              : `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
          }
          alt="user-pic"
        />
        <div className="welcome__greet--username">{`Welcome ${firstName} ${lastName}`}</div>
      </div>
      <button onClick={history.goBack}>Go back</button>
      <button onClick={history.goForward}>Go forward</button>
      <img className="welcome__notification" src={bell.src} alt={bell.alt} />
    </div>
  );
}
