import React from "react";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import "./CourseCardDB.scss";

export function CourseCardDB({ course }) {
  const { web_dev, clock, detail } = images;

  const { courseName, thumbnail, course_duration } = course;

  return (
    <div className="coursedb">
      <img className="coursedb__img" src={thumbnail} alt={web_dev.alt} />
      <div className="coursedb__name">
        <h3 className="coursedb__name-title">
          {courseName.length > 15
            ? courseName.substring(0, 15) + "..."
            : courseName}
        </h3>
        <p className="coursedb__name-author">by Brad Traversery</p>
      </div>
      {/* <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock.src} alt={clock.alt} />
        <p>6h 30min</p>
      </div> */}
      <div className="coursedb__time">
        <img className="coursedb__time-icon" src={clock.src} alt={clock.alt} />
        <p>{course_duration ? course_duration : "00"} hrs.</p>
      </div>
      {/* <div className="coursedb__rating">
        <img className="coursedb__rating-icon" src={star.src} alt={star.alt} />
        <p>4.9</p>
      </div> */}
      {/* <button className="coursedb__viewBtn">View Course</button> */}
      <Link to={`/details/${course._id}`}>
        {/* <button className="coursedb__viewBtn"></button> */}
        <img
          className="coursedb__time-icon"
          src={detail.src}
          alt={detail.alt}
        />
      </Link>
    </div>
  );
}
