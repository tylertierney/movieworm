import { Flex, HStack, Button, Icon } from "@chakra-ui/react";

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

  movieArray.reverse();

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem">
      <Flex w="100%" justify="space-between" pr="1rem" align="center">
        <BrandedHeading
          props={{
            fontSize: ["1.8rem", "2rem", "2rem"],
            mb: "0rem",
            userSelect: "none",
          }}
        >
          {group.name}
        </BrandedHeading>
        <Link passHref href={`/group/${group.group_id}`}>
          <Button
            fontSize="0.9rem"
            variant="outline"
            rightIcon={
              <Icon
                color="brand.text.dark"
                fontSize="0.9rem"
                as={AiOutlineHome}
              />
            }
            color="brand.text.dark"
            size="sm"
          >
            Group Home
          </Button>
        </Link>
      </Flex>
      {reviewsList === undefined || reviewsList === null ? (
        <></>
      ) : (
        <HStack
          overflowX="scroll"
          className="hideScrollbar"
          p="0.4rem 0.4rem 1.5rem 0.4rem"
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
