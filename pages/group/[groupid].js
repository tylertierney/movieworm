import { useLocalUser } from "../../context/authContext";

import { Flex } from "@chakra-ui/react";

const GroupHomePage = () => {
  const { localUser } = useLocalUser();

  let groupMembersArray = [];

  if (localUser && localUser.activeGroup) {
    groupMembersArray = localUser.activeGroup.members.map((member, index) => {
      return (
        <p key={index}>
          {index + 1}.&nbsp;{member.username}
        </p>
      );
    });
  }

  return <Flex p="1rem">{groupMembersArray}</Flex>;
};

export default GroupHomePage;
