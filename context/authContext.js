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
    // Since the user in MongoDB only has references to groups (not actual group data),
    // we'll use that ID reference to fetch the meaningful group data (reviews, members, etc)
    // and enrich the localUser context

    await axios
      .get(`/api/user/${userFromMongo._id}/getgroups`)
      .then((res) => {
        const groups = res.data.data;
        userFromMongo.groups = groups;
        dispatch({ type: "login", payload: userFromMongo });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "login", payload: userFromMongo });
      });

    // dispatch({ type: "login", payload: userFromMongo });
  };

  const logout = (name) => {
    dispatch({ type: "logout", payload: name });
    localStorage.clear();
    router.push("/");
  };

  const setActiveGroup = (userid, groupid) => {
    let copyOfLocalUser = { ...localUser };

    copyOfLocalUser.groups.forEach((group) => {
      if (group.group_id === groupid) {
        copyOfLocalUser.activeGroup = group;
      }
    });

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
