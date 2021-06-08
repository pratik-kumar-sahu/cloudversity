import React from "react";
import prev from "../../assets/images/prev.png";
import next from "../../assets/images/next.png";
import bell from "../../assets/images/bell.png";
import CourseCardDB from "../../components/CourseCardDB/CourseCardDB";
import Search from "../../components/Search/Search";
import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard__welcome">
        <div className="dashboard__welcome-greet">
          <img
            className="dashboard__welcome-greet--userpic"
            src="https://t4.ftcdn.net/jpg/01/67/07/95/360_F_167079543_Rk1lsNYGxsfbJHXqM4y7voo3cmm1DcpV.jpg"
            alt="user-pic"
          />
          <div className="dashboard__welcome-greet--username">
            Welcome Phoebe
          </div>
        </div>
        <img
          className="dashboard__welcome-notification"
          src={bell}
          alt="notification"
        />
      </div>
      <div className="dashboard__watching">
        <CourseCardDB />
        <img className="dashboard__watching-icon1" src={prev} alt="previous" />
        <img className="dashboard__watching-icon2" src={next} alt="next" />
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
  );
}

export default Dashboard;
