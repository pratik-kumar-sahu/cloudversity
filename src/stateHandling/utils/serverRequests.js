import axios from "axios";
import {
  courseActionType,
  studentActionType,
  tutorActionType,
} from "../actionTypes";
import { courseApis } from "./apis";

export const getCourses = async (dispatch) => {
  try {
    const {
      data: { data },
      status,
    } = await axios({ method: "GET", url: courseApis.GET.allCourses });
    // console.log(status);

    if (status === 200) {
      //   console.log(data);
      dispatch({ type: courseActionType.allCourses, payload: data });
    } else {
      throw new Error("No Response");
    }
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async (formData, selectedUserType, dispatch) => {
  try {
    const {
      data: { data, message, token },
    } = await axios({
      method: "POST",
      // url: userApis.POST.studentLogin,
      url: `http://localhost:5233/${selectedUserType}/login`,
      data: formData,
    });
    console.log(data, message, token);
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
      url: `http://localhost:5233/${selectedUserType}/signup`,
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

export const addCourse = async (formData) => {};
