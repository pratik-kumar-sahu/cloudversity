import { courseActionType } from "../actionTypes";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case courseActionType.allCourses:
      return { ...state, courses: action.payload };

    case courseActionType.getWishlist:
      console.log(action.type);
      return { ...state, wishListItems: action.payload };

    case courseActionType.removeFromWishList:
      return { ...state, wishListItems: action.payload };

    case courseActionType.getCart:
      return { ...state, cartItems: action.payload };

    default:
      break;
  }
};
