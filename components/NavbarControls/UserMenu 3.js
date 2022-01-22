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

import { useState, useEffect } from "react";

import { getActiveGroupFromLocalStorage } from "../../utils/helperFunctions";
import axios from "axios";

const UserMenu = ({ user }) => {
  const [groupsArray, setGroupsArray] = useState([]);

  const activeGroup = getActiveGroupFromLocalStorage();

  const { localUser, setActiveGroup, addActiveGroupToLocalUser } =
    useLocalUser();

  useEffect(() => {
    if (localUser) {
      if (localUser.groups.length > 0) {
        setActiveGroup(localUser._id, localUser.groups[0].group_id);
      }
    }

    axios
      .get(`/api/user/${localUser._id}/getgroups`)
      .then((res) => {
        const groupsAsMenuItems = res.data.data.map((group) => {
          let isActive = false;
          if (
            group.name == localUser.activeGroup?.name ||
            activeGroup == "undefined"
          ) {
            isActive = true;
          }
          return {
            text: group.name,
            icon: <Icon as={AiOutlineUser} />,
            onClick: () => {
              setActiveGroup(localUser._id, group.group_id);
              addActiveGroupToLocalUser(group);
            },
            isActive,
          };
        });
        setGroupsArray(() => groupsAsMenuItems);
      })
      .catch((err) => console.log(err));
  }, [localUser.activeGroup?.name]);

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

  let trimmedUsername = truncateUsername(user.email);

  for (let i = 0; i < activeGroup?.members.length; i++) {
    const member = activeGroup?.members[i];
    if (member.userid == localUser._id) {
      trimmedUsername = truncateUsername(member.username);
    }
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
