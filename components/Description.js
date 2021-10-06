import {
  Text,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  Image,
  Button,
  Divider,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import BrandedParagraph from "../components/BrandedParagraph";
import { useEffect, useState } from "react";
import { groupBy, generateKey } from "../utils/helperFunctions";

import { AiOutlinePlus } from "react-icons/ai";

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
    if (id === undefined) {
      return;
    }
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.api_key}&language=en-US`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCredits(() => data))
      .catch((err) => console.log(err));
  }, [id]);

  const [multipleDirectors, setMultipleDirectors] = useState(false);

  const findDirectors = (crew) => {
    console.log(credits, crew);
    if (credits === undefined) {
      return;
    }
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
  };

  const headingColor = useColorModeValue("brand.gray", "brand.white");

  const findCast = (cast) => {
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
          cursor="default"
          zIndex={1}
          maxH="2.3rem"
        >
          <Flex direction="column" p="0 0.3rem">
            <Text as="span" fontSize="0.8rem" fontWeight="normal">
              {item.name}
            </Text>
            <Text opacity="0.8" fontSize="0.5rem" fontWeight="normal">
              {item.character}
            </Text>
          </Flex>
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

  return (
    <>
      {movieDetails ? (
        <Flex direction="column" p="0.4rem 1rem 0.4rem 0.4rem" m="0rem 0.4rem">
          <Flex
            align="center"
            w="100%"
            justify="space-between"
            p="0rem 1rem 0.2rem 0"
          >
            <Heading color={headingColor} maxW="80%" fontSize="1.4rem">
              {title}
            </Heading>

            <Flex>
              <IconButton
                size="sm"
                variant="ghost"
                fontSize="2rem"
                cursor="pointer"
                icon={<ChevronUpIcon />}
                onClick={() => setDescriptionShowing(false)}
              />
            </Flex>
          </Flex>
          <Flex
            // maxW="900px"
            direction="column"
          >
            <BrandedParagraph props={{ fontSize: "0.9rem", p: "0 0 0.5rem 0" }}>
              {overview}
            </BrandedParagraph>
            <Divider />
            {credits && (
              <>
                <Text fontSize="0.9rem" fontWeight="bold" p="0.4rem 0 0.4rem 0">
                  Director{multipleDirectors ? "s" : ""}:&nbsp;
                  {findDirectors(credits.crew)}
                </Text>
                <Divider />
                <Flex align="center">
                  <Text
                    as="span"
                    fontSize="0.9rem"
                    fontWeight="bold"
                    p="0.4rem 0 0.4rem 0"
                  >
                    Cast:&nbsp;
                  </Text>
                  <Flex
                    p="0.4rem 1rem 0.4rem 0"
                    overflowX="scroll"
                    className="hideScrollbar"
                  >
                    {credits === undefined ? null : findCast(credits.cast)}
                  </Flex>
                </Flex>
                <Divider />
              </>
            )}
            <Flex
              justify="space-between"
              p="0.4rem 0.4rem 0.4rem 0"
              align="center"
            >
              <Text as="span" fontSize="0.9rem" fontWeight="bold">
                Reviews:&nbsp;
              </Text>
              <Button
                size="sm"
                color="white"
                variant="solid"
                colorScheme="blue"
                rightIcon={<AiOutlinePlus color="white" />}
              >
                Add Review
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default Description;
