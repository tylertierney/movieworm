import axios from "axios";

import { Flex, Text, Image, Box } from "@chakra-ui/react";

import Link from "next/link";

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

export const getMemberInfoFromUserID = (userid, members) => {
  let username = "";
  let targeted_member = null;

  members.forEach((member) => {
    if (member.userid === userid) {
      targeted_member = member;
    }
  });

  return targeted_member;
};

export const truncateUsername = (usernameOrEmail) => {
  if (usernameOrEmail === undefined || usernameOrEmail === null) {
    return usernameOrEmail;
  }

  if (usernameOrEmail.length > 16) {
    return usernameOrEmail.substr(0, 16) + "...";
  }

  return usernameOrEmail;
};

export const getCastItems = (cast) => {
  return cast.map((item, index) => {
    return (
      <Flex
        key={index}
        shrink="0"
        align="center"
        border="solid lightgray 1px"
        borderRadius="lg"
        p="0 0 0 0.2rem"
        boxShadow="2px 2px 8px 1px rgb(0, 0, 0, 0.1)"
        mr="1rem"
        _hover={{ transform: "scale(1.05)" }}
        transition="0.3s ease-in-out"
        zIndex={1}
        maxH="2.3rem"
        cursor="pointer"
      >
        <Link href={`https://www.imdb.com/find?q=${item.name}`} passHref>
          <a target="_blank">
            <Flex direction="column" p="0 0.3rem">
              <Text as="span" fontSize="0.8rem" fontWeight="normal">
                {item.name}
              </Text>
              <Text opacity="0.8" fontSize="0.5rem" fontWeight="normal">
                {item.character}
              </Text>
            </Flex>
          </a>
        </Link>
        <Image
          alt={item.name}
          fallbackSrc="https://via.placeholder.com/60?text=+"
          borderRightRadius="lg"
          objectFit="cover"
          width="40px"
          height="100%"
          src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
        />
      </Flex>
    );
  });
};
