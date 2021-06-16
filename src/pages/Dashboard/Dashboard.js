import React, { useContext } from "react";
import { Redirect } from "react-router";
import images from "../../assets/images";
import { CourseCardDB, Search } from "../../components";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import "./Dashboard.scss";

export function Dashboard() {
  const { user } = useContext(AuthContext);

  const { prev, next } = images;

  return user ? (
    <div className="dashboard">
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
