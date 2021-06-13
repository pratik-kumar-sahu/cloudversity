import { studentActionType, tutorActionType } from "../actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case tutorActionType.verifyTutor:
      return {
        ...state,
        user: action.payload,
      };

    case studentActionType.verifyStudent:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
