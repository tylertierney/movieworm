import BrandedHeading from "../components/BrandedHeading";

import BrandedSubheading from "../components/BrandedSubheading";

import BrandedParagraph from "../components/BrandedParagraph";

import Link from "next/link";

import { Flex, Text, OrderedList, ListItem } from "@chakra-ui/react";

const AboutPage = () => {
  return (
    <Flex direction="column" p="1rem">
      <BrandedHeading props={{ p: "0", mb: "0.7rem" }}>
        Welcome To MovieWorm
      </BrandedHeading>

      <OrderedList maxW="420px">
        <ListItem>
          <Text p="0rem 0.4rem 0.6rem 0.4rem">Create a private group.</Text>
        </ListItem>
        <ListItem>
          <Text p="0rem 0.4rem 0.6rem 0.4rem">
            Use your group invitation code to invite friends.
          </Text>
        </ListItem>
        <ListItem>
          {" "}
          <Text p="0rem 0.4rem 0.6rem 0.4rem">
            Customize your group profile with a username and profile picture.
          </Text>
        </ListItem>
        <ListItem>
          <Text p="0rem 0.4rem 0.6rem 0.4rem">
            Share movie reviews and ratings.
          </Text>
        </ListItem>
      </OrderedList>
      {/* <br />
      <BrandedSubheading>Questions or concerns?</BrandedSubheading>
      <Text p="0rem 0.4rem 0.6rem 0.4rem">
        Email&nbsp;
        <a
          style={{ textDecoration: "underline" }}
          href="mailto:tytierney@yahoo.com"
        >
          tytierney@yahoo.com
        </a>
      </Text> */}
    </Flex>
  );
};

export default AboutPage;
