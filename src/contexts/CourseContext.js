import React, { createContext, useEffect, useState } from "react";

export const CourseContext = createContext();

function CourseContextProvider({ children }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5233/tut/all-courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.data))
      .catch((err) => console.log(err.message));
  }, [setCourses]);

  return (
    <CourseContext.Provider value={{ courses }}>
      {children}
    </CourseContext.Provider>
  );
}

export default CourseContextProvider;
