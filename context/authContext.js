import router from "next/router";
import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { findUserByEmail } from "../utils/helperFunctions";

import { useUser } from "@auth0/nextjs-auth0";

// console.log(user);

const placeholder_user = {
  firstname: "Tyler",
  lastname: "Tierney",
  username: "ttierney",
  email: "tytierney@yahoo.com",
  id: "123456",
};

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
        break;
      default:
        return state;
    }
  };

  const [localUser, dispatch] = useReducer(reducer, null);

  const login = (userFromMongo) => {
    const activeGroup = localStorage.getItem("movieworm-active_group");

    if (activeGroup) {
      userFromMongo.groups.forEach((group) => {
        if (group.name === activeGroup) {
          group.isActive = true;
        } else {
          group.isActive = false;
        }
      });
    }

    dispatch({ type: "login", payload: userFromMongo });
    // localStorage.setItem("user", JSON.stringify(placeholder_user));
    // router.push("/");
  };

  const logout = (name) => {
    dispatch({ type: "logout", payload: name });
    localStorage.clear();
    router.push("/");
  };

  const setActiveGroup = (group_name) => {
    let copyOfLocalUser = { ...localUser };
    copyOfLocalUser.groups.forEach((group, index) => {
      if (group.name === group_name) {
        group.isActive = true;
        localStorage.setItem("movieworm-active_group", group.name);
      } else {
        group.isActive = false;
      }
    });

    dispatch({ type: "setActiveGroup", payload: copyOfLocalUser });

    // dispatch({type: "setActiveGroup", payload: })
  };

  const ctx = { localUser, login, logout, setActiveGroup };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useLocalUser = () => useContext(AuthContext);
