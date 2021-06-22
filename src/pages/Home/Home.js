import React, { useContext, useEffect, useRef } from "react";
import { Search, CourseCard } from "../../components";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import { StateContext } from "../../stateHandling/contexts/StateContext";
import { fetchCoursesFromDB } from "../../stateHandling/utils/serverRequests";
import { popularCourses } from "./filterFunctions";
import "./Home.scss";

export function Home() {
  const {
    state: { courses, wishListItems, cartItems },
  } = useContext(StateContext);
  const { dispatch } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  const scrollOnClick = useRef(null);

  useEffect(() => {
    fetchCoursesFromDB(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const popular = popularCourses(courses);
    console.log(popular);
  }, [courses]);

  const scrollHandler = (val) => {
    scrollOnClick.current.scrollLeft += val;
  };

  return (
    <div className="home">
      <div className="home__brand">
        <h2>CloudVersity</h2>
        <Search />
      </div>
      <div
        style={{
          margin: "0 0 1rem 0",
          borderBottom: "1px solid black",
          display: "inline-block",
        }}
      >
        Recommended
      </div>

      <div className="home__scroll">
        <button
          className="home__scroll-btns"
          onClick={() => scrollHandler(-800)}
        >
          👈
        </button>
        <div className="home__scroll-list" ref={scrollOnClick}>
          {courses.length ? (
            courses.map((course) => {
              const id = course._id;
              const isItWishlistItem = !!wishListItems?.filter(
                (item) => item._id === id
              ).length;
              const isItCartItem = !!cartItems?.filter(
                (item) => item._id === id
              ).length;
              return (
                <CourseCard
                  key={id}
                  course={course}
                  user={user}
                  dispatch={dispatch}
                  isItCartItem={isItCartItem}
                  isItWishlistItem={isItWishlistItem}
                />
              );
            })
          ) : (
            <div>No courses found</div>
          )}
        </div>
        <button
          className="home__scroll-btns"
          onClick={() => scrollHandler(800)}
        >
          👉
        </button>
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
