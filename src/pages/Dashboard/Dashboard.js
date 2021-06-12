import React, { useContext } from "react";
import { Redirect } from "react-router";
import images from "../../assets/images";
import { CourseCardDB, Search } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import "./Dashboard.scss";

export function Dashboard() {
  const { user } = useContext(AuthContext);

  const { prev, next, bell } = images;

  return user ? (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-greet">
          <img
            className="dashboard__welcome-greet--userpic"
            src={user.user.imageUrl}
            alt="user-pic"
          />
          <div className="dashboard__welcome-greet--username">
            Welcome {user.user.name}
          </div>
        </div>
        <img
          className="dashboard__welcome-notification"
          src={bell.src}
          alt={bell.alt}
        />
      </div>
      <div className="dashboard__watching">
        <CourseCardDB />
        <img
          className="dashboard__watching-icon1"
          src={prev.src}
          alt={prev.alt}
        />
        <img
          className="dashboard__watching-icon2"
          src={next.src}
          alt={next.alt}
        />
      </div>
      <div className="dashboard__courseList">
        <div className="dashboard__courseList-category">
          <div>
            <span>All Courses</span>
            <span>Most Popular</span>
            <span>Top Rated</span>
            <span>Newest</span>
          </div>
          <Search />
        </div>
        <div className="dashboard__courseList-scroll">
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
          <CourseCardDB />
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/usertype" />
  );
}
