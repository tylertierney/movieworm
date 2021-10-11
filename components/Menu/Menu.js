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
} from "@chakra-ui/react";

import Link from "next/link";
import { useLocalUser } from "../../context/authContext";

const MenuComponent = ({ menuName, menuIcon, menuItems }) => {
  const { localUser } = useLocalUser();

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
        <a>{children}</a>
      </Link>
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
          <MenuList bgColor={menuColor}>{menuItemArray}</MenuList>
        </>
      )}
    </Menu>
  );
};

export default MenuComponent;
