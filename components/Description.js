import { Text, Flex, Heading } from "@chakra-ui/react";
import BrandedParagraph from "../components/BrandedParagraph";
import { useEffect, useState } from "react";

const Description = ({ movieDetails }) => {
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

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(process.env.API_KEY);

  return (
    <>
      {movieDetails && (
        <Flex
          direction="column"
          p="0.4rem"
          m="0rem 0.4rem"
          border="solid green 1px"
        >
          <Heading fontSize="1.6rem">{title}</Heading>
          <BrandedParagraph>{overview}</BrandedParagraph>
          <Text fontSize="0.9rem" fontWeight="bold">
            Director:
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Description;
