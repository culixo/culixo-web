import React, { createContext, useReducer } from "react";

import * as actionTypes from "./actions";
import reducer from "./reducer";

const initialState = {
  user: null,
  theme: "light",
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setAuth(updatedUser) {
    dispatch({
      type: actionTypes.SET_USER,
      payload: updatedUser,
    });
  }
  function setTheme(newTheme) {
    dispatch({
      type: actionTypes.SET_THEME,
      payload: newTheme,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        setAuth,
        theme: state.theme,
        setTheme,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
