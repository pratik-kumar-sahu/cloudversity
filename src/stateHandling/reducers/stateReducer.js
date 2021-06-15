import { courseActionType } from "../actionTypes";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case courseActionType.allCourses:
      return { ...state, courses: action.payload };

    case courseActionType.wishList:
      return { ...state, wishListItems: action.payload };

    default:
      break;
  }
};
