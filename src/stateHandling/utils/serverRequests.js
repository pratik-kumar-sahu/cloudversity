import axios from "axios";
import {
  courseActionType,
  studentActionType,
  tutorActionType,
} from "../actionTypes";
import { base_url, courseApis, userApis } from "./apis";

// https://cloudversity-api-server.herokuapp.com/course/60c3641a5638ef407098a96d

const API = axios.create({
  baseURL: base_url,
});

// export const getCourses = () => API.get(courseApis.GET.allCourses);

export const fetchCoursesFromDB = async (dispatch) => {
  try {
    const {
      data: { data },
      status,
    } = await API.get(courseApis.GET.allCourses);

    if (status === 200) {
      dispatch({ type: courseActionType.allCourses, payload: data });
    } else {
      throw new Error("No Response");
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchWishListFromDB = async (user, dispatch) => {
  try {
    const {
      user: { _id },
    } = user;
    // console.log(user, _id);
    const {
      data: { data },
    } = await axios({
      method: "GET",
      url: `${base_url}/stu/allstudents`,
    });
    const fetchUserData = data.filter((e) => e._id === _id);
    console.log(fetchUserData[0]);
    dispatch({
      type: courseActionType.getWishlist,
      payload: fetchUserData[0].wishlist,
    });
  } catch (err) {}
};

export const addToWishList = async (id, user, dispatch) => {
  // const check =
  console.log(user, id);
  try {
    const { data } = await axios({
      method: "POST",
      url: `${base_url}/stu/addtowishlist/${id}`,
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    console.log(data);
    if (data) {
      fetchWishListFromDB(user, dispatch);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const removeFromWishList = async (id, user, dispatch) => {
  console.log(user, id);
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${base_url}/stu/removefromwishlist/${id}`,
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    console.log(data);
    if (data) {
      fetchWishListFromDB(user, dispatch);
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchCartFromDB = async (user, dispatch) => {
  try {
    const {
      user: { _id },
    } = user;
    // console.log(user, _id);
    const {
      data: { data },
    } = await axios({
      method: "GET",
      url: `${base_url}/stu/allstudents`,
    });
    const fetchUserData = data.filter((e) => e._id === _id);
    console.log(fetchUserData[0]);
    dispatch({
      type: courseActionType.getCart,
      payload: fetchUserData[0].cart,
    });
  } catch (err) {}
};

export const fetchCreatedCoursesFromDB = async (user, dispatch) => {
  try {
    const {
      user: { _id },
    } = user;
    const {
      data: { data },
    } = await axios({
      method: "GET",
      url: `${base_url}/tut/alltutors`,
    });
    const fetchUserData = data.filter((e) => e._id === _id)[0];
    dispatch({
      type: "FETCH_CREATED_COURSES",
      payload: fetchUserData.createdCourses,
    });
  } catch (err) {}
};

export const addToCart = async (id, user, dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${base_url}/stu/addtocart/${id}`,
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    console.log(data);
    if (data) {
      fetchCartFromDB(user, dispatch);
    }
  } catch (err) {}
};

export const removeFromCart = async (id, user, dispatch) => {
  try {
    const { data } = await axios({
      method: "PATCH",
      url: `${base_url}/stu/removefromcart/${id}`,
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    console.log(data);
    if (data) {
      fetchCartFromDB(user, dispatch);
    }
  } catch (err) {}
};

export const getCourseById = async (id) => {
  try {
    const {
      data: { requestedCourse },
    } = await API.get(`/course/${id}`);
    return requestedCourse;
  } catch (err) {}
};

export const userLogin = async (formData, selectedUserType, dispatch) => {
  try {
    const url =
      selectedUserType === "tut"
        ? userApis.POST.tutorLogin
        : userApis.POST.studentLogin;
    const {
      data: { data, token },
    } = await API.post(url, formData);
    data.token = token;
    console.log(data.token);

    if (data) {
      if (selectedUserType === "tut") {
        dispatch({ type: tutorActionType.verifyTutor, payload: data });
      } else {
        dispatch({ type: studentActionType.verifyStudent, payload: data });
      }
    }
  } catch (err) {}
};

export const userSignup = async (formData, selectedUserType, dispatch) => {
  try {
    const {
      data: { data, message },
    } = await axios({
      method: "POST",
      // url: userApis.POST.studentSignup,
      url: `https://cloudversity-api-server.herokuapp.com/${selectedUserType}/signup`,
      data: formData,
    });
    console.log(data, message);
    if (data) {
      if (selectedUserType === "tut") {
        dispatch({ type: tutorActionType.verifyTutor, payload: data });
      } else {
        dispatch({ type: studentActionType.verifyStudent, payload: data });
      }
    }
  } catch (err) {}
};

export const addCourse = async (formData, file, user, dispatch) => {
  try {
    formData.thumbnail = file;
    formData.price = parseInt(formData.price);
    formData.course_duration = parseInt(formData.course_duration);
    formData.discount = parseInt(formData.discount);
    console.log(formData);
    console.log("File inside addCourse call :", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const data = await axios({
        method: "POST",
        crossorigin: false,
        url: `https://cloudversity-api-server.herokuapp.com/addcourse`,
        data: { ...formData, thumbnail: reader.result },
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });
      console.log(data);
      await fetchCreatedCoursesFromDB(user, dispatch);
      return true;
    };
    reader.onerror = () => {
      console.error("Couldn't process the image");
    };
  } catch (err) {}
};

export const updateCourse = async (formData, file, user, dispatch, id) => {
  try {
    formData.thumbnail = file;
    formData.price = parseInt(formData.price);
    formData.course_duration = parseInt(formData.course_duration);
    formData.discount = parseInt(formData.discount);
    console.log(formData);
    console.log("File inside addCourse call :", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const data = await axios({
        method: "PATCH",
        url: `https://cloudversity-api-server.herokuapp.com/updatecourse/${id}`,
        data: { ...formData, thumbnail: reader.result },
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });
      console.log(data);
      await fetchCreatedCoursesFromDB(user, dispatch);
    };
    reader.onerror = () => {
      console.error("Couldn't process the image");
    };
  } catch (err) {}
};

export const deleteCourseFromDB = async (id, user, dispatch) => {
  try {
    const data = await axios({
      method: "DELETE",
      url: `https://cloudversity-api-server.herokuapp.com/deletecourse/${id}`,
      headers: {
        Authorization: `Bearer ${user.user.token}`,
      },
    });
    console.log(data);
    await fetchCreatedCoursesFromDB(user, dispatch);
    // if (data) {
    //   if (selectedUserType === "tut") {
    //     dispatch({ type: tutorActionType.verifyTutor, payload: data });
    //   } else {
    //     dispatch({ type: studentActionType.verifyStudent, payload: data });
    //   }
    // }
  } catch (err) {}
};

export const uploadVideo = async (id, token, data) => {
  try {
    console.log(data);
    const reader = new FileReader();
    reader.readAsDataURL(data.file);
    reader.onloadend = async () => {
      const datas = await axios({
        method: "POST",
        url: `${base_url}/uploadvideo/${id}`,
        data: { ...data, file: reader.result },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(datas);
    };
  } catch (err) {}
};

export const deleteVideo = async (videoId, token) => {
  try {
    const data = await axios({
      method: "DELETE",
      url: `${base_url}/deletevideo/${videoId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(data);
    return data;
  } catch (err) {
    console.log("Error Occured: ", err);
    return null;
  }
};

export const postReview = async (courseId, reviewData, token) => {
  try {
    console.log("reviewData inside postReview: ", courseId, token, reviewData);
    const res = await axios({
      method: "POST",
      url: `${base_url}/addreview/${courseId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: reviewData,
    });

    if (res.status === 200) {
      console.log("review posted successfully");
      return res;
    } else {
      console.log("Error while posting the review");
      return res;
    }
  } catch (error) {
    console.log("Error while posting review", error);
    return null;
  }
};
