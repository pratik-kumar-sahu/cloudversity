import React from "react";
import "./CourseCard.scss";

export function CourseCard({ course }) {
  const {
    courseName,
    thumbnail,
    authorName: { firstName, lastName },
    course_duration,
  } = course;

  return (
    <div className="course">
      <img className="course__img" src={thumbnail} alt="course-pic" />
      <div className="course__contents">
        <div className="course__contents-details">
          <p>700 students</p>
          <p>{course_duration}</p>
        </div>
        <div className="course__contents-name">{courseName}</div>
        <div className="course__contents-author">
          <p>{`${firstName} ${lastName}`}</p>
          <div>❤️</div>
        </div>
      </div>
    </div>
  );
}
