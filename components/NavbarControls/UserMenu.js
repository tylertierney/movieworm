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

  const { localUser } = useLocalUser();

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
      text: "Log localuser",
      icon: <Icon as={AiOutlineUser} />,
      onClick: () => console.log(localUser),
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

  let trimmedUsername = user?.nickname;
  if (user?.nickname.length > 16) {
    trimmedUsername = user.nickname.substr(0, 16) + "...";
  }

  return (
    <Menu
      menuName={trimmedUsername}
      menuIcon={menuIcon}
      menuItems={menuItems}
    />
  );
};

export default UserMenu;
