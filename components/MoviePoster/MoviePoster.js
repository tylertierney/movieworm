import { Box, Image, Flex, Text } from "@chakra-ui/react";

const MoviePoster = ({ reviews, handleClick, movieDetails }) => {
  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = movieDetails;

  const averageRating = (reviews) => {
    const reducer = (acc, elem) => {
      return acc + Number(elem.rating);
    };

    const total = reviews.reduce(reducer, 0);
    const average = total / reviews.length;
    return average.toFixed(1);
  };

  return (
    <Box
      position="relative"
      _hover={{ transform: "scale(1.05)" }}
      onClick={() => handleClick(movieDetails, reviews)}
      transition="0.3s ease-in-out"
      cursor="pointer"
    >
      <Image
        boxShadow="7px 7px 10px 1px rgb(0, 0, 0, 0.2)"
        w={40}
        minW={40}
        minH="240px"
        maxH="300px"
        alt={`${title} Poster`}
        src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
      />
      <Flex
        h="100%"
        w="100%"
        position="absolute"
        top="0"
        left="0"
        background="linear-gradient(29deg, rgba(255,255,255,0) 74%, rgba(0,0,0,1) 96%)"
        justify="space-between"
        pr="0.2rem"
      >
        <Flex fontSize="0.55rem" p="0.3rem 0.4rem">
          <Flex
            p="0.2rem"
            h="0.8rem"
            align="center"
            justify="center"
            boxShadow="3px 3px 10px 1px rgb(0, 0, 0, 0.2)"
            bgColor="blue.800"
            borderRadius="sm"
            opacity="0.8"
          >
            <Text color="white">
              {`${reviews.length} Review`}
              {reviews.length > 1 ? "s" : ""}
            </Text>
          </Flex>
        </Flex>
        <Flex align="baseline">
          <Text color="white" fontSize="0.8rem" as="span">
            {averageRating(reviews)}
          </Text>
          <Text color="white" as="span" fontSize="0.5rem">
            /10
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MoviePoster;
