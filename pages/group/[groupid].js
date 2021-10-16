import { useLocalUser } from "../../context/authContext";

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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import BrandedHeading from "../../components/BrandedHeading";
import BrandedSubheading from "../../components/BrandedSubheading";

const GroupHomePage = () => {
  const [idIsCopied, setIdIsCopied] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const { localUser } = useLocalUser();

  if (localUser === null || localUser === undefined) {
    return <div>loading</div>;
  }

  if (localUser.activeGroup === null || localUser.activeGroup === undefined) {
    return <div>loading</div>;
  }

  useEffect(() => {
    if (localUser._id === localUser.activeGroup.owner_id) {
      setUserIsAdmin(true);
    }
  }, []);

  let groupMembersArray = [];

  if (localUser && localUser?.activeGroup) {
    groupMembersArray = localUser?.activeGroup.members.map((member, index) => {
      return (
        <>
          <Flex
            w="100%"
            justify="space-between"
            align="center"
            key={index}
            p="0.5rem"
          >
            {member.username}
            {userIsAdmin ? (
              <>
                {member.userid === localUser._id ? (
                  <></>
                ) : (
                  <Button variant="outline" colorScheme="red" size="sm">
                    Remove
                  </Button>
                )}
              </>
            ) : (
              <>
                {member.userid === localUser.activeGroup.owner_id ? (
                  <Text
                    userSelect="none"
                    fontSize="0.8rem"
                    borderRadius="lg"
                    p="0.2rem 0.4rem"
                    border="1px solid white"
                  >
                    Admin
                  </Text>
                ) : (
                  <></>
                )}
              </>
            )}
          </Flex>
          <Divider />
        </>
      );
    });
  }

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
          {localUser?.activeGroup.name}
        </BrandedHeading>
      </Flex>
      <Flex pl="0.4rem" direction="column" maxW="360px">
        <BrandedSubheading
          props={{ fontSize: "1rem", p: "0", m: "0", mr: "1rem" }}
        >
          Group ID
        </BrandedSubheading>
        <FormControl position="relative" maxW="360px" mb="1rem">
          <FormHelperText
            w="100%"
            textAlign="right"
            position="absolute"
            top="-1.8rem"
          >
            {idIsCopied ? "Copied!" : " "}
          </FormHelperText>
          <InputGroup>
            <Input
              isReadOnly={true}
              value={localUser.activeGroup.group_id}
              type="text"
            />
            <InputRightElement>
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
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Flex direction="column">{groupMembersArray}</Flex>
      </Flex>
    </Flex>
  );
};

export default GroupHomePage;
