import HorizontalList from "../HorizontalList";
import Description from "../Description";
import BrandedSubheading from "../BrandedSubheading";

import { Box, Flex, Divider, useDisclosure, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import BrandedParagraph from "../BrandedParagraph";

import { groupBy } from "../../utils/helperFunctions";

import ReviewModal from "../ReviewModal/ReviewModal";

const Section = ({ title, movieList }) => {
  const [descriptionShowing, setDescriptionShowing] = useState(false);
  const [descriptionDetails, setDescriptionDetails] = useState({});
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionShowing) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.opacity = "1";
      descriptionRef.current.style.visibility = "visible";
      descriptionRef.current.style.transition = "0.3s ease-in-out";
    } else {
      descriptionRef.current.style.height = "0";
      descriptionRef.current.style.opacity = "0.5";
      descriptionRef.current.style.visibility = "hidden";
      descriptionRef.current.style.transition = "none";
    }
  }, [descriptionShowing, descriptionDetails]);

  const noReviewsMessage = (
    <Flex
      w="100%"
      paddingX="1rem"
      h="100%"
      justify="center"
      align="center"
      direction="column"
      mb="1.5rem"
    >
      <Box maxW="75%">
        <BrandedSubheading
          props={{ fontSize: "1rem", m: "0", textAlign: "center" }}
        >
          Your group hasn&apos;t posted any reviews yet
        </BrandedSubheading>
        <BrandedParagraph props={{ fontSize: "0.8rem", textAlign: "center" }}>
          Click on a movie to view details and leave a rating or review.
        </BrandedParagraph>
      </Box>
    </Flex>
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [multipleDirectors, setMultipleDirectors] = useState(false);

  const findDirectors = (crew) => {
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

  const [credits, setCredits] = useState(null);

  return (
    <Box>
      <HorizontalList
        title={title}
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
        descriptionShowing={descriptionShowing}
      />
      <Box ref={descriptionRef} height="0" opacity="0">
        <Description
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setDescriptionShowing={setDescriptionShowing}
          movieDetails={descriptionDetails}
          multipleDirectors={multipleDirectors}
          setMultipleDirectors={setMultipleDirectors}
          credits={credits}
          setCredits={setCredits}
          findDirectors={findDirectors}
        />
      </Box>
      {movieList.length === 0 ? noReviewsMessage : <></>}
      <Divider />
      <ReviewModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        movieDetails={descriptionDetails}
        multipleDirectors={multipleDirectors}
        setMultipleDirectors={setMultipleDirectors}
        credits={credits}
        findDirectors={findDirectors}
      />
    </Box>
  );
};

export default Section;
