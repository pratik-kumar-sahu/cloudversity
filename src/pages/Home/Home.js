import React, { useContext } from "react";
import { Search, CourseCard } from "../../components";
import { Link } from "react-router-dom";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import "./Home.scss";

export function Home() {
  const {
    state: { courses },
  } = useContext(StateContext);

  return (
    <div className="home">
      <div className="home__brand">
        <h2>CloudVersity</h2>
        <Search />
      </div>
      <div
        style={{
          margin: "0 0 0 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Recommended
      </div>
      <div className="home__scroll">
        {courses.length ? (
          courses.map((course) => {
            const id = course._id;
            return (
              <Link
                style={{ color: "inherit", textDecoration: "none" }}
                key={id}
                to={`/details/${id}`}
              >
                <CourseCard key={id} course={course} />
              </Link>
            );
          })
        ) : (
          <div>No courses found</div>
        )}
      </div>
      <div
        style={{
          margin: "1rem 0 0 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Popular
      </div>
      <div className="home__scroll"></div>
    </div>
  );
}
