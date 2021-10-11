import Menu from "../Menu/Menu";
// import { useUser } from "../../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import {
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlinePlus,
} from "react-icons/ai";

import { useLocalUser } from "../../context/authContext";

const UserMenu = ({ user }) => {
  // const { logout } = useUser();

  const { localUser, setActiveGroup } = useLocalUser();

  const menuItems = [
    {
      text: "You",
      icon: <Icon as={AiOutlineUser} />,
      link: "/user/abc",
    },
    {
      text: "Create a Group",
      icon: <Icon as={AiOutlinePlus} />,
      // link: `/user/${localUser["_id"]}`,
      link: `/user/${localUser?._id}/creategroup`,
    },
    {
      text: "Join a Group",
      icon: <Icon as={AiOutlineUsergroupAdd} />,
      link: "/",
    },
    {
      text: "Log Out",
      icon: <Icon as={BiLogOut} />,
      link: "/api/auth/logout",
    },
  ];

  let groupsArray;

  if (localUser.groups.length > 0) {
    groupsArray = localUser.groups.map((group) => {
      console.log(group.isActive);
      return {
        text: group.name,
        icon: <Icon as={AiOutlineUser} />,
        onClick: () => setActiveGroup(group.name),
        isActive: group.isActive,
      };
    });
  }

  const menuIcon = [
    <ChevronDownIcon key="1234567" fontSize="1.4rem" />,
    <ChevronUpIcon key="509887123487969765" fontSize="1.4rem" />,
  ];

  let trimmedUsername = user?.email;
  if (user?.email.length > 16) {
    trimmedUsername = user.email.substr(0, 16) + "...";
  }

  return (
    <Menu
      menuName={trimmedUsername}
      menuIcon={menuIcon}
      menuItems={menuItems}
      groupsArray={groupsArray}
    />
  );
};

export default UserMenu;
