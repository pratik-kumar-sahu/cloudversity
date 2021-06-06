import "./App.scss";
import home from "./home.png";
import menu from "./menu.png";
import c from "./c.png";
import prev from "./prev.png";
import next from "./next.png";
import profile from "./profile.png";
import logout from "./logout.png";
import Course from "./components/Course";

function App() {
  return (
    <div className="container">
      <div className="container__leftContainer">
        <img className="container__leftContainer--icon" src={c} alt="c-icon" />
        <img
          className="container__leftContainer--icon"
          src={home}
          alt="home-icon"
        />
        <img
          className="container__leftContainer--icon"
          src={menu}
          alt="menu-icon"
        />
        <img
          className="container__leftContainer--icon"
          src={profile}
          alt="profile-icon"
        />
        <img
          className="container__leftContainer--icon"
          src={logout}
          alt="logout-icon"
        />
      </div>
      <div className="container__mainContainer">
        <div className="container__mainContainer-welcome">
          Welcome to Dashboard
        </div>
        <div className="container__mainContainer-watching">
          <Course />
          <img
            className="container__mainContainer-watching--icon1"
            src={prev}
            alt="previous"
          />
          <img
            className="container__mainContainer-watching--icon2"
            src={next}
            alt="next"
          />
        </div>
        <div className="container__mainContainer-courseList">
          {/* <h3>Courses</h3> */}
          <div>
            <span>All Courses</span>
            <span>Most Popular</span>
            <span>Top Rated</span>
            <span>Newest</span>
          </div>
          <div className="container__mainContainer-courseList--scroll">
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
            <Course />
          </div>
        </div>
      </div>
      <div className="container__rightContainer"></div>
    </div>
  );
}

export default App;
