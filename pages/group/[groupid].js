import { useLocalUser } from "../../context/authContext";

import { Flex, Text, Input, InputRightElement, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import BrandedHeading from "../../components/BrandedHeading";

const GroupHomePage = () => {
  const { localUser } = useLocalUser();

  const [idIsCopied, setIdIsCopied] = useState(false);

  useEffect(() => {
    if (localUser === null) {
      window.location = "/";
    }

    if (localUser.activeGroup === null || localUser.activeGroup === undefined) {
      window.location = "/";
    }
  }, []);

  let groupMembersArray = [];

  if (localUser && localUser.activeGroup) {
    groupMembersArray = localUser.activeGroup.members.map((member, index) => {
      return (
        <Text key={index}>
          {index + 1}.&nbsp;{member.username}
        </Text>
      );
    });
  }

  let group = {};

  if (localUser.activeGroup) {
    group = localUser.activeGroup;
  }

  const copyID = () => {
    setIdIsCopied(true);
    navigator.clipboard.writeText(group.group_id);
  };

  return (
    <Flex direction="column" p="0.4rem 0.4rem 0 0.4rem">
      <Flex w="100%" justify="space-between" pr="1rem" align="center">
        <BrandedHeading
          props={{
            fontSize: ["1.8rem", "2rem", "2rem"],
            mb: "0rem",
          }}
        >
          {group.name}
        </BrandedHeading>
      </Flex>
      <Flex pl="0.4rem">
        <Text>{`Group ID ${group.group_id}`}</Text>
        {/* <Input
          isReadOnly={true}
          isDisabled
          value={group?.name}
          type="text"
          mb="1rem"
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
        </InputRightElement> */}
        <br />
        {groupMembersArray}
      </Flex>
    </Flex>
  );
};

export default GroupHomePage;
