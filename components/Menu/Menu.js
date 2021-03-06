import {
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuDivider,
  MenuGroup,
  Text,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle } from "react-icons/ai";

import Link from "next/link";
import { useLocalUser } from "../../context/authContext";

const MenuComponent = ({ menuName, menuIcon, menuItems, groupsArray }) => {
  const { localUser } = useLocalUser();

  const greenIconColor = useColorModeValue("green", "lightgreen");

  const menuItemArray = menuItems.map((item, index) => {
    const children = (
      <MenuItem onClick={item.onClick ? item.onClick : null}>
        {item.icon}
        <Text ml="10px">{item.text}</Text>
      </MenuItem>
    );
    if (item.link === undefined) {
      return children;
    }
    return (
      <Link key={index} href={item.link} passHref>
        <a aria-label={item.text}>{children}</a>
      </Link>
    );
  });

  const groupItems = groupsArray?.map((group, index) => {
    return (
      <MenuItem key={index} onClick={group.onClick ? group.onClick : null}>
        {group.icon}
        <Flex align="center" grow="1" justify="space-between">
          <Text ml="10px">{group.text}&nbsp;&nbsp;</Text>
          {group.isActive ? (
            <Icon as={AiOutlineCheckCircle} color={greenIconColor} />
          ) : (
            <></>
          )}
        </Flex>
      </MenuItem>
    );
  });

  const menuColor = useColorModeValue("brand.white", "brand.darkgray");

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            userSelect="none"
            as={Flex}
            cursor="pointer"
            flexDirection="row"
          >
            <Text color="brand.text.dark" fontSize="1rem">
              {menuName}
              {isOpen ? menuIcon[1] : menuIcon[0]}
            </Text>
          </MenuButton>
          <MenuList bgColor={menuColor} fontSize="0.8rem">
            {menuItemArray}
            <MenuDivider />
            {groupsArray ? (
              <MenuGroup title="Groups">{groupItems}</MenuGroup>
            ) : (
              <></>
            )}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default MenuComponent;
