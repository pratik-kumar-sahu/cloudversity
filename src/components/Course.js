import React from "react";
import star from "../star.png";
import clock from "../clock.png";
import web_dev from "../images/web_dev.jpg";

function Course() {
  return (
    <div className="container__mainContainer-courseList--scroll-item">
      <img src={web_dev} alt="course-img" />
      <div className="name">
        <h3 className="name__title">Learn Web</h3>
        <p className="name__author">by Brad Traversery</p>
      </div>
      <div className="time">
        <img className="time__icon" src={clock} alt="time" />
        <p>6h 30min</p>
      </div>
      <div className="time">
        <img className="time__icon" src={clock} alt="modules" />
        <p>10 modules</p>
      </div>
      <div className="rating">
        <img className="rating__icon" src={star} alt="ratings" />
        <p>4.9</p>
      </div>
      <button className="viewBtn">View Course</button>
    </div>
  );
}

export default Course;
