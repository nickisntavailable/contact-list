import { API_URL, CHANGE_CONTACTS, CHANGE_USER, RootState, SET_DATA, SET_IS_AUTHED, SET_IS_LOADING } from "app/constants";
import { TAuth, TUser } from "app/types";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";



export const setData = (data: {
  user: TUser,
  contactList: TUser[]
}) => {
  return {
    type: SET_DATA,
    payload: data
  };
};

export const setAuthed = (isAuthed: boolean) => {
  return {
    type: SET_IS_AUTHED,
    payload: {isAuthed}
  };
};
export const setLoading = (isLoading: boolean) => {
  return {
    type: SET_IS_LOADING,
    payload: {isLoading}
  };
};

export const changeUser = (user: TUser & {contacts: TUser[]}) => {
  return {
    type: CHANGE_USER,
    payload: {user}
  };
};
export const changeContactsList = (contactList: TUser[]) => {
  return {
    type: CHANGE_CONTACTS,
    payload: {contactList}
  };
};



export const removeContactFromUser = (contactId: string): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {

    const user = getState().data.user
    dispatch(changeUser({
      id: user.id,
      name: user.name,
      contacts: user.contacts.filter(e => e.id !== contactId)
    }))

  };
};

export const addContactFromUser = (contactId: string): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {
    const {user, contactList} = getState().data
    const list = user.contacts.find(e => e.id === contactId) ? user.contacts : [...user.contacts, contactList.filter(e => e.id === contactId).pop()!]
    
    dispatch(changeUser({
      id: user.id,
      name: user.name,
      contacts: list
    }))

  };
};

export const changeContactName = (contactId: string, name:string): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {
    const {user, contactList} = getState().data
    // const list = user.contacts.find(e => e.id === contactId) ? user.contacts : [...user.contacts, contactList.filter(e => e.id === contactId).pop()!]
    const list = user.contacts.map(c => c.id === contactId ? {...c, name} : c)
    
    dispatch(changeUser({
      id: user.id,
      name: user.name,
      contacts: list
    }))
    const contacts = contactList.map(c => c.id === contactId ? {...c, name} : c)

    dispatch(changeContactsList(contacts))

  };
};


export const getData = ({name, password}: TAuth): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => RootState) => {
    if(!password || !name) {
      return
    }
    const state = getState()
    dispatch(setLoading(state.data.isLoading))
    const res = await fetch(API_URL);
    const data = await res.json();
    dispatch(setData(data))
    dispatch(setLoading(!state.data.isLoading))
    dispatch(setAuthed(true))
  };
};



