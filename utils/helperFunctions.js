import axios from "axios";

export const generateKey = () => {
  const key = Math.floor(Math.random() * 10000);
  return key.toString();
};

export const groupBy = (objectArray, property) => {
  const reducer = (acc, elem) => {
    let key = elem[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(elem);
    return acc;
  };

  return objectArray.reduce(reducer, {});
};

export const findUserByEmail = (email) => {
  return axios
    .get(`/api/user/${email}`)
    .then((res) => res.data)

    .catch((err) => err);
};
