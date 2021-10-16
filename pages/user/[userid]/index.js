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

import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen";

import { useEffect, useState } from "react";

import BrandedHeading from "../../../components/BrandedHeading";
import BrandedSubheading from "../../../components/BrandedSubheading";

const UserHomePage = () => {
  const [idIsCopied, setIdIsCopied] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const borderColor = useColorModeValue("brand.text.light", "brand.text.dark");

  useEffect(() => {
    if (localUser._id === localUser.activeGroup.owner_id) {
      setUserIsAdmin(true);
    }
  }, []);

  const { localUser } = useLocalUser();

  if (localUser === null || localUser === undefined) {
    return <LoadingScreen status="loading" />;
  }

  if (localUser.activeGroup === null || localUser.activeGroup === undefined) {
    return <LoadingScreen status="loading" />;
  }

  let groupsArray = [];

  if (localUser) {
    groupsArray = localUser?.groups.map((group, index) => {
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
              <Button variant="outline" colorScheme="red" size="xs">
                Leave Group
              </Button>
            )}
          </Flex>
          <Divider />
        </Box>
      );
    });
  }

  //   if (localUser && localUser?.activeGroup) {
  //     groupMembersArray = localUser?.activeGroup.members.map((member, index) => {
  //       return (
  //         <Box key={index}>
  //           <Flex w="100%" justify="space-between" align="center" p="0.5rem">
  //             <Text color="brand.text.dark">{member.username}</Text>
  //             {userIsAdmin ? (
  //               <>
  //                 {member.userid === localUser._id ? (
  //                   <></>
  //                 ) : (
  // <Button variant="outline" colorScheme="red" size="sm">
  //   Remove
  // </Button>
  //                 )}
  //               </>
  //             ) : (
  //               <>
  //                 {member.userid === localUser.activeGroup.owner_id ? (
  // <Text
  //   userSelect="none"
  //   fontSize="0.8rem"
  //   borderRadius="lg"
  //   p="0.2rem 0.4rem"
  //   border="1px solid"
  //   borderColor={borderColor}
  // >
  //   Admin
  // </Text>
  //                 ) : (
  //                   <></>
  //                 )}
  //               </>
  //             )}
  //           </Flex>
  //           <Divider />
  //         </Box>
  //       );
  //     });
  //   }

  const copyID = () => {
    setIdIsCopied(true);
    navigator.clipboard.writeText(localUser?.activeGroup.group_id);
  };

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
          {/* <FormHelperText
            w="100%"
            textAlign="right"
            position="absolute"
            top="-1.8rem"
          >
            {idIsCopied ? "Copied!" : " "}
          </FormHelperText> */}
          <InputGroup>
            <Input
              color="brand.text.dark"
              isReadOnly={true}
              value={localUser.email}
              type="text"
            />
            {/* <InputRightElement>
              <Button
                onClick={(e) => {
                  copyID();
                }}
                variant="ghost"
                p="1rem 1.8rem"
                size="sm"
                mr="1.8rem"
                _focus={{ outline: "none" }}
                color="brand.text.light"
              >
                Copy
              </Button>
            </InputRightElement> */}
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