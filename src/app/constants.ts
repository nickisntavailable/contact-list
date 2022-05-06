import { TUser } from "./types";

export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_DATA = "SET_DATA";
export const SET_IS_AUTHED = "SET_IS_AUTHED";

export const CHANGE_USER = "CHANGE_USER";
export const CHANGE_CONTACTS = "CHANGE_CONTACTS";

export const API_URL = "../data/data.json"


export const initialState = {
  data: {
    user: {},
    isAuthed: false,
    isLoading: false,
    contactList: {},
  },
};
export type RootState = {
  data: {
    user: TUser & {contacts: TUser[]};
    isAuthed: boolean;
    isLoading: boolean;
    contactList: TUser[];
  };
};
