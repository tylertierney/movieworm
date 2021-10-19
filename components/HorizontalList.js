import {
  Flex,
  HStack,
  Image,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Text,
} from "@chakra-ui/react";

import LoadingIcon from "./LoadingIcon/LoadingIcon";

import BrandedHeading from "./BrandedHeading";

import { useLocalUser } from "../context/authContext";

import MoviePoster from "./MoviePoster/MoviePoster";
import { groupByNestedProperty } from "../utils/helperFunctions";

import FallbackImg from "./FallbackImg/FallbackImg";

import { AiOutlineClose } from "react-icons/ai";

const HorizontalList = ({
  title,
  movieList,
  handleClick,
  group,
  isSearchbar,
  searchQuery,
  setSearchQuery,
}) => {
  const { setIsSearching } = useLocalUser();

  const reviewsList = groupByNestedProperty(
    group?.reviews,
    "movieDetails",
    "id"
  );

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem" minH="200px">
      <Flex
        align="center"
        justify="space-between"
        maxW="94vw"
        pr="1rem"
        mt="0.8rem"
        mb="0.2rem"
      >
        <BrandedHeading>{title}</BrandedHeading>
        {isSearchbar && (
          <InputGroup>
            <Input
              autoFocus
              ml="0.6rem"
              variant="flushed"
              color="brand.text.dark"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement>
              <Icon
                cursor="pointer"
                as={AiOutlineClose}
                onClick={() => setIsSearching()}
              />
            </InputRightElement>
          </InputGroup>
        )}
      </Flex>

      {movieList.length > 0 ? (
        <HStack
          overflowX="scroll"
          className="hideScrollbar"
          p="0.4rem 1.4rem 1.5rem 0.4rem"
          m="0"
          spacing={3}
        >
          {movieList.map((item, index) => {
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
            } = item;

            if (group != undefined && group != null) {
              for (let i = 0; i < group.reviews.length; i++) {
                const { movieDetails } = group.reviews[i];

                if (movieDetails.id === id) {
                  return (
                    <MoviePoster
                      key={id}
                      movieDetails={movieDetails}
                      reviews={reviewsList[id]}
                      handleClick={handleClick}
                    />
                  );
                }
              }
            }

            return (
              <Box
                key={index}
                _hover={{ transform: "scale(1.05)" }}
                transition="0.3s ease-in-out"
                cursor="pointer"
              >
                <Image
                  onClick={() => handleClick(item)}
                  boxShadow="7px 7px 10px 1px rgb(0, 0, 0, 0.2)"
                  w={40}
                  minW={40}
                  minH="240px"
                  alt={`${title} Poster`}
                  src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                  fallback={<FallbackImg alt={`${title}`} />}
                />
              </Box>
            );
          })}
        </HStack>
      ) : (
        <>
          {isSearchbar && (
            <Flex
              p="1rem"
              justify="center"
              align="center"
              minH="120px"
              h="100%"
              w="100%"
            >
              <LoadingIcon />
            </Flex>
          )}
        </>
      )}
    </Flex>
  );
};

export default HorizontalList;
