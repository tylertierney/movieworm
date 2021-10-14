import { Flex, HStack, Image, Box } from "@chakra-ui/react";

import BrandedHeading from "../BrandedHeading";

import MoviePoster from "../MoviePoster/MoviePoster";

const GroupHorizontalList = ({ title, handleClick, reviewsList }) => {
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
      <BrandedHeading
        props={{
          fontSize: "2rem",
          mb: "0rem",
        }}
      >
        {title}
      </BrandedHeading>
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
