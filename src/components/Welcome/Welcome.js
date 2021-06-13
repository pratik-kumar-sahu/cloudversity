import React from "react";
import images from "../../assets/images";
import "./Welcome.scss";

const { bell } = images;

export function Welcome({ user: { user } }) {
  const { firstName, lastName, profileImg } = user;

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
      <img className="welcome__notification" src={bell.src} alt={bell.alt} />
    </div>
  );
}
