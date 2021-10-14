import axios from "axios";

import { Text } from "@chakra-ui/react";

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

export const groupByNestedProperty = (
  objectArray,
  property,
  nestedProperty
) => {
  if (objectArray === null || objectArray === undefined) {
    return;
  }

  const reducer = (acc, elem) => {
    let key = elem[property][nestedProperty];
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

export const findDirectors = (credits) => {
  if (credits === undefined || credits === null) {
    return { list: null, multipleDirectors: false };
  }

  let crew = credits.crew;
  let multipleDirectors = false;

  const directorsArray = groupBy(crew, "job")["Director"];

  if (directorsArray.length > 1) {
    multipleDirectors = true;
  }
  const list = directorsArray.map((item, index) => {
    let addComma = true;
    if (index === directorsArray.length - 1) {
      addComma = false;
    }
    return (
      <Text as="span" key={index} fontWeight="normal">
        {item.name}
        {addComma ? ", " : ""}
      </Text>
    );
  });

  return { list, multipleDirectors };
};

export const getUsernameFromUserId = (userid, activeGroup) => {
  let username = "";

  activeGroup.members.forEach((member) => {
    if (member.userid === userid) {
      username = member.username;
    }
  });

  return username;
};
