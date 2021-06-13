import { courseActionType } from "../actionTypes";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case courseActionType.allCourses:
      return { ...state, courses: action.payload };

    default:
      break;
  }
};
