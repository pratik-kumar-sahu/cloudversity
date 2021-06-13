const base_url = "https://cloudversity-api-server.herokuapp.com";

export const courseApis = {
  GET: {
    allCourses: `${base_url}/allcourses`,
    getCourseById: `${base_url}/courses/:courseId`,
  },
  POST: {
    addCourse: `${base_url}/addcourse`,
    addVideo: `${base_url}/uploadvideo/:courseId`,
    enrollCourse: `${base_url}/enroll/:courseId`,
  },
  PATCH: {
    updateCourse: `${base_url}/updatecourse/:courseId`,
    updateThumbnail: `${base_url}/updatethumbnail/:courseId`,
  },
};

export const userApis = {
  GET: {},
  POST: {
    studentLogin: `${base_url}/stu/login`,
    studentSignup: `${base_url}/stu/signup`,
    tutorLogin: `${base_url}/tut/login`,
    tutorSignup: `${base_url}/tut/signup`,
  },
};
