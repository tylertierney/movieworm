import HorizontalList from "../HorizontalList";
import Description from "../Description";

import { Box, Flex, Divider, useDisclosure, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import BrandedParagraph from "../BrandedParagraph";

import ReviewModal from "../ReviewModal/ReviewModal";

import NoReviewsMessage from "../NoReviewsMessage/NoReviewsMessage";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (item) => {
    setDescriptionDetails(item);

    if (!descriptionShowing) {
      setDescriptionShowing(true);
    }
  };

  const [credits, setCredits] = useState(null);

  return (
    <Box>
      <HorizontalList
        handleClick={handleClick}
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
          credits={credits}
          setCredits={setCredits}
        />
      </Box>
      {movieList.length === 0 ? <NoReviewsMessage /> : <></>}
      <Divider />
      <ReviewModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        movieDetails={descriptionDetails}
        credits={credits}
      />
    </Box>
  );
};

export default Section;
