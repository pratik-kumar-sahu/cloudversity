import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TutorCard } from "../../components/TutorCard/TutorCard";
import "./TutorDashboard.scss";

export function TutorDashboard({ user }) {
  const {
    user: { createdCourses },
  } = user;

  const [stats, setStats] = useState({
    enrolled: "",
    earning: "",
    wishlist: "",
  });

  const handleStats = (id) => {
    const { enrolledStudents, wishlistedBy } = user.user.createdCourses.filter(
      (e) => e._id === id
    )[0];

    setStats({
      enrolled: enrolledStudents.length,
      earning: 0,
      wishlist: wishlistedBy.length,
    });
  };

  return (
    <div className="tutor">
      <div className="tutor__row1">
        <Link className="tutor__row1-btn" to="/newcourse">
          Add a Course
        </Link>
        <Link className="tutor__row1-btn">Update a Course</Link>
      </div>
      <div className="tutor__row2">
        <div className="tutor__row2__left">
          <h3 className="tutor__row2__left-header">Your courses</h3>
          <div className="tutor__row2__left-courseList">
            {createdCourses.map((course) => (
              <div
                className="tutorCard"
                key={course._id}
                onClick={() => handleStats(course._id)}
              >
                <TutorCard course={course} />
              </div>
            ))}
          </div>
        </div>
        <div className="tutor__row2__right">
          <div className="tutor__row2__right-stats">
            <p style={{ fontSize: "2.5rem", fontWeight: "600" }}>
              {stats.enrolled}
            </p>
            <p>Enrolled Students</p>
          </div>
          {/* <div style={{ width: "1rem" }}></div> */}
          <div className="tutor__row2__right-stats">
            <p style={{ fontSize: "2.5rem", fontWeight: "600" }}>
              {stats.earning}
            </p>
            <p>Total Earnings</p>
          </div>
          <div className="tutor__row2__right-stats">
            <p style={{ fontSize: "2.5rem", fontWeight: "600" }}>
              {stats.wishlist}
            </p>
            <p>Wishlisted students</p>
          </div>
        </div>
      </div>
    </div>
  );
}
