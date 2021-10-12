import {
  Text,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
  Image,
  Button,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import BrandedParagraph from "../components/BrandedParagraph";
import { useEffect, useState, useRef } from "react";
import { groupBy } from "../utils/helperFunctions";
import { BsChevronDoubleLeft } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";
import ReviewModal from "./ReviewModal/ReviewModal";

const Description = ({
  movieDetails,
  setDescriptionShowing,
  credits,
  setCredits,
  findDirectors,
  isOpen,
  onOpen,
  onClose,
}) => {
  const castScrollerRef = useRef(null);

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

  // const [credits, setCredits] = useState(null);

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

  const [showLeftScrollBtn, setShowLeftScrollBtn] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollLeft > 40) {
      setShowLeftScrollBtn(true);
    } else {
      setShowLeftScrollBtn(false);
    }
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
          <Flex direction="column">
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
                  {showLeftScrollBtn ? (
                    <Icon
                      as={BsChevronDoubleLeft}
                      minW="2.68rem"
                      cursor="pointer"
                      onClick={() => (castScrollerRef.current.scrollLeft = 0)}
                    />
                  ) : (
                    <Text
                      as="span"
                      fontSize="0.9rem"
                      fontWeight="bold"
                      p="0.4rem 0 0.4rem 0"
                      minW="2.68rem"
                    >
                      Cast:&nbsp;
                    </Text>
                  )}
                  <Flex
                    p="0.4rem 1rem 0.4rem 0"
                    overflowX="scroll"
                    className="hideScrollbar"
                    ref={castScrollerRef}
                    onScroll={(e) => handleScroll(e)}
                    style={{ scrollBehavior: "smooth" }}
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
                {`0 Reviews`}
              </Text>
              <Button
                size="sm"
                color="white"
                variant="solid"
                onClick={onOpen}
                backgroundColor="brand.primary.1000"
                rightIcon={<AiOutlinePlus color="white" />}
                _hover={{ opacity: "0.6" }}
                transition="0.3s ease-in-out"
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
