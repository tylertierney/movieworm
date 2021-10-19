import { useLocalUser } from "../../../context/authContext";

import {
  Flex,
  Text,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  FormControl,
  FormHelperText,
  Divider,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

import LeaveGroupModal from "../../../components/LeaveGroupModal/LeaveGroupModal";

import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import { useEffect, useState } from "react";

import BrandedHeading from "../../../components/BrandedHeading";
import BrandedSubheading from "../../../components/BrandedSubheading";

const UserHomePage = () => {
  const borderColor = useColorModeValue("brand.text.light", "brand.text.dark");

  const { localUser } = useLocalUser();

  const bgColor = useColorModeValue("brand.white", "brand.gray");

  if (localUser === null || localUser === undefined) {
    return <LoadingScreen status="loading" />;
  }

  let groupsArray = [];

  if (
    localUser.groups != undefined &&
    localUser.groups != null &&
    localUser.groups.length > 0
  ) {
    groupsArray = localUser.groups.map((group, index) => {
      let isAdmin = false;
      if (group.owner_id === localUser._id) {
        isAdmin = true;
      }

      return (
        <Box key={index}>
          <Flex w="100%" justify="space-between" align="center" p="0.5rem">
            <Text color="brand.text.dark">{group.name}</Text>
            {isAdmin ? (
              <Text
                userSelect="none"
                fontSize="0.8rem"
                borderRadius="lg"
                p="0.2rem 0.4rem"
                border="1px solid"
                borderColor={borderColor}
              >
                Admin
              </Text>
            ) : (
              <LeaveGroupModal
                bgColor={bgColor}
                group={group}
                userid={localUser._id}
              />
            )}
          </Flex>
          <Divider />
        </Box>
      );
    });
  }

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem">
      <Flex
        w="100%"
        maxW="360px"
        justify="space-between"
        pr="1rem"
        align="center"
      >
        <BrandedHeading
          props={{
            fontSize: ["1.8rem", "2rem", "2rem"],
            mb: "1rem",
          }}
        >
          User Profile
        </BrandedHeading>
      </Flex>
      <Flex pl="0.4rem" direction="column" maxW="360px">
        <BrandedSubheading
          props={{ fontSize: "1rem", p: "0", m: "0", mr: "1rem" }}
        >
          Email
        </BrandedSubheading>
        <FormControl position="relative" maxW="360px" mb="1rem">
          <InputGroup>
            <Input
              color="brand.text.dark"
              isReadOnly={true}
              value={localUser.email}
              type="text"
            />
          </InputGroup>
        </FormControl>

        <Flex direction="column">
          <BrandedSubheading
            props={{ fontSize: "1rem", p: "0", m: "0", mr: "1rem" }}
          >
            Groups
          </BrandedSubheading>
          {groupsArray}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserHomePage;
