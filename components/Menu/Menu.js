import {
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuDivider,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import Link from "next/link";

const MenuComponent = ({ menuName, menuIcon, menuItems }) => {
  const menuItemArray = menuItems.map((item, index) => {
    return (
      <Link key={index} href={item.link} passHref>
        <a>
          <MenuItem>
            {item.icon}
            <Text ml="10px">{item.text}</Text>
          </MenuItem>
        </a>
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
