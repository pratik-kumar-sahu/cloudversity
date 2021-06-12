import React, { useContext } from "react";
import { Search, CourseCard } from "../../components";
import { CourseContext } from "../../contexts/CourseContext";
import { Link } from "react-router-dom";
import "./Home.scss";

export function Home() {
  const { courses } = useContext(CourseContext);
  // const [courses, setCourses] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:5233/tut/all-courses")
  //     .then((res) => res.json())
  //     .then((data) => setCourses(data.data))
  //     .catch((err) => console.log(err.message));
  // }, [setCourses]);

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
                <CourseCard course={course} />
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
