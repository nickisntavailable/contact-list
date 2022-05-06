import { CHANGE_CONTACTS, CHANGE_USER, SET_DATA, SET_IS_AUTHED, SET_IS_LOADING } from "app/constants";
import { TUser } from "app/types";

interface IAction {
  type: string
  payload: {
    isLoading?: boolean
    isAuthed?: boolean
    user?: TUser
    contactList?: TUser[]
  }
}


const data = (state = [], action: IAction) => {
  switch (action.type) {
    case SET_IS_LOADING: {
      return {
        ...state, 
        isLoading: action.payload.isLoading
      }
    }
    case SET_DATA: {
      return {
        ...state, 
        ...action.payload
      }
    }
    case SET_IS_AUTHED: {
      return {
        ...state, 
        isAuthed: action.payload.isAuthed
      }
    }
    case CHANGE_USER: {
      return {
        ...state, 
        user: action.payload.user
      }
    }
    case CHANGE_CONTACTS: {
      return {
        ...state, 
        contacts: action.payload.contactList
      }
    }
    default:
      return state;
  }
};
export default data;
