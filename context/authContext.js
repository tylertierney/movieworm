import router from "next/router";
import { useContext, createContext, useReducer, useEffect } from "react";
import { findUserByEmail } from "../utils/helperFunctions";

import { useUser } from "@auth0/nextjs-auth0";

import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    findUserByEmail(user.email)
      .then((res) => login(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return action.payload;
      case "logout":
        return null;
      case "setActiveGroup":
        return action.payload;
      case "addActiveGroupToLocalUser":
        return action.payload;
      default:
        return state;
    }
  };

  const [localUser, dispatch] = useReducer(reducer, null);

  const login = async (userFromMongo) => {
    const activeGroup = localStorage.getItem("movieworm-active_group");

    dispatch({ type: "login", payload: userFromMongo });
  };

  const logout = (name) => {
    dispatch({ type: "logout", payload: name });
    localStorage.clear();
    router.push("/");
  };

  const setActiveGroup = (userid, groupid) => {
    let copyOfLocalUser = { ...localUser };

    axios
      .get(`/api/user/${userid}/${groupid}`)
      .then((res) => {
        if (res.data.data === undefined) {
          return;
        }

        copyOfLocalUser.activeGroup = res.data.data;

        localStorage.setItem(
          "movieworm-active_group",
          JSON.stringify(res.data.data)
        );
      })
      .catch((err) => console.log(err));

    dispatch({ type: "setActiveGroup", payload: copyOfLocalUser });
  };

  const addActiveGroupToLocalUser = (group) => {
    let copyOfLocalUser = { ...localUser };

    copyOfLocalUser.activeGroup = group;

    dispatch({ type: "addActiveGroupToLocalUser", payload: copyOfLocalUser });
  };

  const ctx = {
    localUser,
    login,
    logout,
    setActiveGroup,
    addActiveGroupToLocalUser,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useLocalUser = () => useContext(AuthContext);
