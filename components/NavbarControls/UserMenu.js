import Menu from "../Menu/Menu";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlinePlus,
} from "react-icons/ai";

import { useLocalUser } from "../../context/authContext";

import { truncateUsername } from "../../utils/helperFunctions";

import { useEffect } from "react";

const UserMenu = () => {
  const { localUser, setActiveGroup } = useLocalUser();

  useEffect(() => {
    if (localUser.groups.length > 0) {
      setActiveGroup(localUser._id, localUser.groups[0].group_id);
    }
  }, []);

  const groupsAsMenuItems = localUser.groups.map((group) => {
    let isActive = false;
    if (group.name == localUser.activeGroup?.name) {
      isActive = true;
    }
    return {
      text: group.name,
      icon: <Icon as={AiOutlineUser} />,
      onClick: () => {
        setActiveGroup(localUser._id, group.group_id);
      },
      isActive,
    };
  });

  const menuItems = [
    {
      text: "You",
      icon: <Icon as={AiOutlineUser} />,
      link: "/user/abc",
    },
    {
      text: "Create a Group",
      icon: <Icon as={AiOutlinePlus} />,
      link: `/user/${localUser?._id}/creategroup`,
    },
    {
      text: "Join a Group",
      icon: <Icon as={AiOutlineUsergroupAdd} />,
      link: `/user/${localUser?._id}/joingroup`,
    },
    {
      text: "Log Out",
      icon: <Icon as={BiLogOut} />,
      link: "/api/auth/logout",
    },
  ];

  const menuIcon = [
    <ChevronDownIcon key="1234567" fontSize="1.4rem" />,
    <ChevronUpIcon key="509887123487969765" fontSize="1.4rem" />,
  ];

  let trimmedUsername = truncateUsername(localUser.email);

  for (let i = 0; i < localUser.activeGroup?.members.length; i++) {
    const member = localUser.activeGroup?.members[i];
    if (member.userid == localUser._id) {
      trimmedUsername = truncateUsername(member.username);
    }
  }

  return (
    <Menu
      menuName={trimmedUsername}
      menuIcon={menuIcon}
      menuItems={menuItems}
      groupsArray={groupsAsMenuItems}
    />
  );
};

export default UserMenu;
