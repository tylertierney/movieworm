import Menu from "../Menu/Menu";
// import { useUser } from "../../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

const UserMenu = ({ user }) => {
  // const { logout } = useUser();

  const menuItems = [
    {
      text: "You",
      icon: <Icon as={AiOutlineUser} />,
      link: "/user/abc",
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

  return (
    <Menu menuName={user?.nickname} menuIcon={menuIcon} menuItems={menuItems} />
  );
};

export default UserMenu;
