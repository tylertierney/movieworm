import HorizontalList from "../HorizontalList";
import Description from "../Description";
import BrandedSubheading from "../BrandedSubheading";

import { Box, Flex, Divider } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import BrandedParagraph from "../BrandedParagraph";

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
          setDescriptionShowing={setDescriptionShowing}
          movieDetails={descriptionDetails}
        />
      </Box>
      {movieList.length === 0 ? noReviewsMessage : <></>}
      <Divider />
    </Box>
  );
};

export default Section;
