import React, { useContext, useEffect } from "react";
import { Search, CourseCard } from "../../components";
import { courseActionType } from "../../stateHandling/actionTypes";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import "./Home.scss";

export function Home() {
  const {
    state: { courses, wishListItems },
  } = useContext(StateContext);

  const { user } = useContext(AuthContext);
  console.log(user);

  // useEffect(() => {
  //   dispatch({ type: courseActionType.wishList, payload:  });
  // }, []);

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
            return <CourseCard user={user} key={id} course={course} />;
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
