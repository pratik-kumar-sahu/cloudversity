import React from "react";
import { useHistory } from "react-router";
import images from "../../assets/images";
import "./Welcome.scss";

const { back, forward } = images;

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
      <div className="welcome__icons">
        <span onClick={history.goBack}>
          <img className="welcome__icons-icon" src={back.src} alt={back.alt} />
        </span>
        <span onClick={history.goForward}>
          <img
            className="welcome__icons-icon"
            src={forward.src}
            alt={forward.alt}
          />
        </span>
        {/* <img className="welcome__notification" src={bell.src} alt={bell.alt} /> */}
      </div>
    </div>
  );
}
