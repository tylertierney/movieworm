import { Flex, HStack, Button, Icon, Text } from "@chakra-ui/react";

import BrandedHeading from "../BrandedHeading";

import MoviePoster from "../MoviePoster/MoviePoster";

import { AiOutlineHome } from "react-icons/ai";

import Link from "next/link";

import { useLocalUser } from "../../context/authContext";

const GroupHorizontalList = ({ handleClick, reviewsList, group }) => {
  const { localUser } = useLocalUser();

  let movieArray = [];
  for (const movieid in reviewsList) {
    movieArray.push(
      <MoviePoster
        handleClick={handleClick}
        key={movieid}
        reviews={reviewsList[movieid]}
        movieDetails={reviewsList[movieid][0].movieDetails}
      />
    );
  }

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem">
      <Flex
        w="100%"
        justify="space-between"
        pr="1rem"
        mt="0.8rem"
        mb="0.2rem"
        align="center"
      >
        <BrandedHeading>{group.name}</BrandedHeading>
        <Link passHref href={`/group/${group.group_id}`}>
          <Button
            fontWeight="light"
            fontSize="0.9rem"
            variant="outline"
            color="brand.text.dark"
            size="sm"
            p="1.2rem 0.4rem"
            boxShadow="4px 4px 10px 1px rgb(0, 0, 0, 0.2)"
          >
            <Flex align="center">
              <Flex direction="column" align="flex-start" mr="0.2rem">
                <Text fontWeight="thin" fontSize="0.7rem" color="inherit">
                  Group
                </Text>
                <Text fontWeight="bold" fontSize="0.8rem" color="inherit">
                  Home
                </Text>
              </Flex>

              <Icon
                mb="0.1rem"
                color="brand.text.dark"
                fontSize="1.8rem"
                as={AiOutlineHome}
              />
            </Flex>
          </Button>
        </Link>
      </Flex>
      {reviewsList === undefined || reviewsList === null ? (
        <></>
      ) : (
        <HStack
          overflowX="scroll"
          className="hideScrollbar"
          p="0.4rem 1.4rem 1.5rem 0.4rem"
          m="0"
          spacing={3}
        >
          {movieArray}
        </HStack>
      )}
    </Flex>
  );
};

export default GroupHorizontalList;
