import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../stateHandling/contexts/AuthContext";
import { StateContext } from "../stateHandling/contexts/StateContext";
import { base_url } from "../stateHandling/utils/apis";
import { fetchLastViewedCourse } from "../stateHandling/utils/serverRequests";

export function RightContainer() {
  const { user } = useContext(AuthContext);

  const [lastViewedCourse, setLastViewedCourse] = useState(null);

  const { dispatch } = useContext(StateContext);

  useEffect(() => {
    fetchLastViewedCourse(user, dispatch, setLastViewedCourse);
  }, []);

  return (
    <div className="rightContainer">
      {/* <h3>toggle</h3> */}
      <div className="rightContainer__container">
        <div className="rightContainer__container-btns">
          <button>Profile</button>
          <button>Discussion</button>
        </div>
      </div>
      <div className="rightContainer__discussion">
        <div className="rightContainer__discussion-btn"></div>
      </div>
      <div className="rightContainer__lastViewed">
        <div className="rightContainer__lastViewed-heading">Last Viewed</div>
        <Link
          to={`/details/${lastViewedCourse?._id}`}
          className="rightContainer__lastViewed-course"
        >
          <img
            className="rightContainer__lastViewed-course--img"
            src={`${lastViewedCourse?.thumbnail}`}
            alt="course-pic"
          />
          <div className="rightContainer__lastViewed-course--name">
            {lastViewedCourse?.courseName}
          </div>
        </Link>
      </div>
    </div>
  );
}
