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

export const findUserByEmail = async (email) => {
  return await axios
    .get(`/api/user/${email}`)
    .then((res) => res.data)

    .catch((err) => err);
};

export const findActiveGroup = (localUser) => {
  if (localUser === null || localUser === undefined) {
    return {};
  }

  if (localUser.groups === null || localUser.groups === undefined) {
    return {};
  }
  for (let i = 0; i < localUser.groups.length; i++) {
    if (localUser.groups[i].isActive) {
      return localUser.groups[i];
    }
  }
};
