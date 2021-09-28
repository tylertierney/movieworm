import {
  Text,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import BrandedParagraph from "../components/BrandedParagraph";
import { useEffect, useState } from "react";

const Description = ({ movieDetails, setDescriptionShowing }) => {
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

  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.api_key}&language=en-US`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCredits(() => data))
      .catch((err) => console.log(err));
  }, [id]);

  function groupBy(objectArray, property) {
    const reducer = (acc, elem) => {
      let key = elem[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(elem);
      return acc;
    };

    return objectArray.reduce(reducer, {});
  }

  const [multipleDirectors, setMultipleDirectors] = useState(false);

  const findDirectors = (crew) => {
    if (credits !== null) {
      const directorsArray = groupBy(crew, "job")["Director"];

      if (directorsArray.length > 1) {
        setMultipleDirectors(true);
      }
      return directorsArray.map((item, index) => {
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
    }
  };

  const headingColor = useColorModeValue("brand.gray", "brand.white");

  return (
    <>
      {movieDetails && (
        <Flex direction="column" p="0.4rem" m="0rem 0.4rem">
          <Flex
            align="center"
            w="100%"
            // border="solid red 3px"
            justify="space-between"
          >
            <Heading
              color={headingColor}
              //   border="solid blue 1px"
              maxW="80%"
              fontSize="1.6rem"
            >
              {title}
            </Heading>
            <IconButton
              //   _focus={{ outline: "none", backgroundColor: "transparent" }}
              //   _active={{ backgroundColor: "transparent" }}
              variant="ghost"
              //   opacity="0.5"
              fontSize="2rem"
              cursor="pointer"
              icon={<ChevronUpIcon />}
              onClick={() => setDescriptionShowing(false)}
            />
          </Flex>
          <BrandedParagraph>{overview}</BrandedParagraph>

          {credits && (
            <>
              <Text fontSize="0.9rem" fontWeight="bold" p="0.4rem 0 0.4rem 0">
                Director{multipleDirectors ? "s" : ""}:&nbsp;
                {findDirectors(credits.crew)}
              </Text>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default Description;
