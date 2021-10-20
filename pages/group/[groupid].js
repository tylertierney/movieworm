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
  useColorModeValue,
  Box,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import BrandedHeading from "../../components/BrandedHeading";
import BrandedSubheading from "../../components/BrandedSubheading";

import EditUserInfoModal from "../../components/EditUserInfoModal/EditUserInfoModal";

import RemoveMemberModal from "../../components/RemoveMemberModal/RemoveMemberModal";

import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

const GroupHomePage = () => {
  const [idIsCopied, setIdIsCopied] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const borderColor = useColorModeValue("brand.text.light", "brand.text.dark");

  useEffect(() => {
    if (localUser._id === localUser.activeGroup.owner_id) {
      setUserIsAdmin(true);
    }
  }, []);

  const bgColor = useColorModeValue("brand.white", "brand.gray");

  const { localUser } = useLocalUser();

  if (localUser === null || localUser === undefined) {
    return <LoadingScreen status="loading" />;
  }

  if (localUser.activeGroup === null || localUser.activeGroup === undefined) {
    return <LoadingScreen status="loading" />;
  }

  let groupMembersArray = [];

  if (localUser && localUser?.activeGroup) {
    groupMembersArray = localUser?.activeGroup.members.map((member, index) => {
      console.log(member.prof_pic);

      return (
        <Box key={index}>
          <Flex w="100%" justify="space-between" align="center" p="1rem">
            <Flex align="center">
              <Avatar
                src={member.prof_pic}
                name={member.username}
                size="sm"
                mr="1rem"
              />
              <Text color="brand.text.dark">{member.username}</Text>
            </Flex>

            {localUser._id === member.userid && (
              <EditUserInfoModal
                group={localUser.activeGroup}
                member={member}
                bgColor={bgColor}
              />
            )}
            {userIsAdmin ? (
              <>
                {member.userid === localUser._id ? (
                  <></>
                ) : (
                  <>
                    <RemoveMemberModal
                      group={localUser.activeGroup}
                      member={member}
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      bgColor={bgColor}
                    />
                  </>
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
                    border="1px solid"
                    borderColor={borderColor}
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
        </Box>
      );
    });
  }

  const copyID = () => {
    setIdIsCopied(true);
    navigator.clipboard.writeText(localUser?.activeGroup.group_id);
  };

  return (
    <Flex direction="column" p="1rem 0.4rem 0 0.4rem">
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
              color="brand.text.dark"
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

        <Flex direction="column" mb="2rem">
          <BrandedSubheading
            props={{ fontSize: "1rem", p: "0", m: "0", mr: "1rem" }}
          >
            Members
          </BrandedSubheading>
          {groupMembersArray}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GroupHomePage;
