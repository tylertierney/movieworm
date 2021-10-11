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
    console.log(user);
    if (user === undefined) {
      return;
    }

    console.log(user);
    findUserByEmail(user.email)
      .then((res) => login(res.data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  // useEffect(() => {
  //   if (user == undefined) {
  //     return;
  //   }

  //   console.log(user);
  //   findUserByEmail(user.email)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }, [user?.email]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return action.payload;
      case "logout":
        return null;
      default:
        return state;
    }
  };

  const [localUser, dispatch] = useReducer(reducer, null);

  const login = (userFromMongo) => {
    dispatch({ type: "login", payload: userFromMongo });
    // localStorage.setItem("user", JSON.stringify(placeholder_user));
    // router.push("/");
  };

  const logout = (name) => {
    dispatch({ type: "logout", payload: name });
    localStorage.clear();
    router.push("/");
  };

  const ctx = { localUser, login, logout };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useLocalUser = () => useContext(AuthContext);
