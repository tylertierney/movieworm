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
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import BrandedParagraph from "../components/BrandedParagraph";
import { useEffect, useState, useRef } from "react";
import { BsChevronDoubleLeft } from "react-icons/bs";

import { AiOutlinePlus } from "react-icons/ai";

import {
  findDirectors,
  getUsernameFromUserId,
  getCastItems,
} from "../utils/helperFunctions";

import { useLocalUser } from "../context/authContext";

const Description = ({
  movieDetails,
  setDescriptionShowing,
  credits,
  setCredits,
  onOpen,
  reviewsArray,
  group,
}) => {
  const castScrollerRef = useRef(null);

  const { localUser } = useLocalUser();

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
    if (id === undefined) {
      return;
    }
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.api_key}&language=en-US`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setCredits(() => data))
      .catch((err) => console.log(err));
  }, [id]);

  const headingColor = useColorModeValue("brand.gray", "brand.white");

  const [showLeftScrollBtn, setShowLeftScrollBtn] = useState(false);

  const handleScroll = (e) => {
    if (e.target.scrollLeft > 40) {
      setShowLeftScrollBtn(true);
    } else {
      setShowLeftScrollBtn(false);
    }
  };

  const reviewArrayItems = reviewsArray?.map((review, index) => {
    const postedAtDate = () => {
      if (review.postedAt === null || review.postedAt === undefined) {
        return null;
      }

      return new Date(review.postedAt).toLocaleDateString();
    };

    const postedBy = (userid) => {
      return getUsernameFromUserId(userid, group.members);
    };

    return (
      <Flex
        key={index}
        direction="column"
        border="solid 1px"
        borderColor="brand.primary.1000"
        borderRadius="lg"
        p="0.5rem 0.5rem 0.1rem 0.5rem"
        boxShadow="5px 3px 20px 1px rgb(0, 0, 0, 0.2)"
        mb="1rem"
      >
        <Flex pb="0.5rem" align="center" justify="space-between">
          <Text fontSize="0.6rem">{postedBy(review.userid)}</Text>

          <Flex align="baseline">
            <Text fontSize="1rem">{review.rating}</Text>
            <Text fontSize="0.6rem">/10</Text>
          </Flex>
        </Flex>

        <Text fontSize="0.8rem">{review.reviewText}</Text>
        <Flex pb="0.5rem" align="center" justify="flex-end">
          <Text fontSize="0.5rem">{postedAtDate()}</Text>
        </Flex>
      </Flex>
    );
  });

  let reviewsNumber = "0 Reviews";

  if (reviewsArray?.length === 1) {
    reviewsNumber = "1 Review";
  }

  if (reviewsArray?.length > 1) {
    reviewsNumber = `${reviewsArray.length} Reviews`;
  }

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
                  Director
                  {findDirectors(credits).multipleDirectors ? "s" : ""}
                  :&nbsp;
                  {findDirectors(credits).list}
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
                    {credits === undefined ? null : getCastItems(credits.cast)}
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
                {reviewsNumber}
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
            {reviewArrayItems}
            {/* <Divider /> */}
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default Description;
