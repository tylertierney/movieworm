import HorizontalList from "../HorizontalList";
import Description from "../Description";

import { Box, Divider, useDisclosure, Text } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

import ReviewModal from "../ReviewModal/ReviewModal";

import NoReviewsMessage from "../NoReviewsMessage/NoReviewsMessage";

import { groupByNestedProperty } from "../../utils/helperFunctions";

const Section = ({ title, movieList, group }) => {
  const [descriptionShowing, setDescriptionShowing] = useState(false);
  const [descriptionDetails, setDescriptionDetails] = useState({});
  const [reviewsArray, setReviewsArray] = useState(null);
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

  const handleClick = (descriptionDetails, reviewsArray) => {
    setDescriptionDetails(descriptionDetails, reviewsArray);
    if (reviewsArray) {
      setReviewsArray(reviewsArray);
    }
    if (!descriptionShowing) {
      setDescriptionShowing(true);
    }
  };

  const [credits, setCredits] = useState(null);

  const reviewsList = groupByNestedProperty(
    group.reviews,
    "movieDetails",
    "id"
  );

  return (
    <Box>
      <HorizontalList
        handleClick={handleClick}
        title={title}
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
        descriptionShowing={descriptionShowing}
        group={group}
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
