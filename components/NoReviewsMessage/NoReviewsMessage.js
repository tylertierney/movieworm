import { Flex, Box } from "@chakra-ui/react";

import BrandedSubheading from "../BrandedSubheading";
import BrandedParagraph from "../BrandedParagraph";

const NoReviewsMessage = () => {
  return (
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
};

export default NoReviewsMessage;
