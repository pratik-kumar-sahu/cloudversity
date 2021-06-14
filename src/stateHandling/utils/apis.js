export const base_url = "https://cloudversity-api-server.herokuapp.com";

export const courseApis = {
  GET: {
    allCourses: `/allcourses`,
    getCourseById: `/courses/:courseId`,
  },
  POST: {
    addCourse: `/addcourse`,
    addVideo: `/uploadvideo/:courseId`,
    enrollCourse: `/enroll/:courseId`,
  },
  PATCH: {
    updateCourse: `/updatecourse/:courseId`,
    updateThumbnail: `/updatethumbnail/:courseId`,
  },
};

export const userApis = {
  GET: {},
  POST: {
    studentLogin: `/stu/login`,
    studentSignup: `/stu/signup`,
    tutorLogin: `/tut/login`,
    tutorSignup: `/tut/signup`,
  },
};
