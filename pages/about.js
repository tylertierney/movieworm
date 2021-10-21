import BrandedHeading from "../components/BrandedHeading";

import BrandedSubheading from "../components/BrandedSubheading";

import BrandedParagraph from "../components/BrandedParagraph";

import { Flex, Text } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Flex direction="column" p="1rem">
      <BrandedHeading props={{ p: "0", mb: "0.7rem" }}>
        Welcome To MovieWorm
      </BrandedHeading>

      <Text p="0rem 0.4rem 0.6rem 0.4rem">1. Create a private group.</Text>
      <Text p="0rem 0.4rem 0.6rem 0.4rem">
        2. Use your group invitation code to invite friends.
      </Text>
      <Text p="0rem 0.4rem 0.6rem 0.4rem">
        3. Customize your group profile with a username and profile picture.
      </Text>
      <Text p="0rem 0.4rem 0.6rem 0.4rem">
        4. Share movie reviews and ratings.
      </Text>
      <br />
      <BrandedSubheading>Questions or concerns?</BrandedSubheading>
      <Text p="0rem 0.4rem 0.6rem 0.4rem">Email tytierney@yahoo.com</Text>
    </Flex>
  );
};

export default AboutPage;
