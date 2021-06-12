const url = process.env.PUBLIC_URL + "/images";

const images = {
  prev: { id: 0, src: `${url}/prev.png`, alt: "previous-icon" },
  next: { id: 1, src: `${url}/next.png`, alt: "next-icon" },
  bell: { id: 2, src: `${url}/bell.png`, alt: "bell-icon" },
  clock: { id: 3, src: `${url}/clock.png`, alt: "clock-icon" },
  home: { id: 4, src: `${url}/home.png`, alt: "home-icon" },
  logout: { id: 5, src: `${url}/logout.png`, alt: "logout-icon" },
  menu: { id: 6, src: `${url}/menu.png`, alt: "menu-icon" },
  profile: { id: 7, src: `${url}/profile.png`, alt: "profile-icon" },
  star: { id: 8, src: `${url}/star.png`, alt: "star-icon" },
  web_dev: { id: 9, src: `${url}/web_dev.jpg`, alt: "course-icon" },
  student: { id: 8, src: `${url}/student.jpg`, alt: "student-icon" },
  tutor: { id: 8, src: `${url}/tutor.jpg`, alt: "tutor-icon" },
};

export default images;
