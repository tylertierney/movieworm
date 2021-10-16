import {
  IconButton,
  useColorMode,
  Icon,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      ml="0.5rem"
      mr="0.5rem"
      cursor="pointer"
      onClick={toggleColorMode}
      color="brand.text.dark"
    >
      {colorMode === "light" ? (
        <MoonIcon as="button" color="inherit" />
      ) : (
        <SunIcon as="button" color="inherit" />
      )}
    </Flex>
  );
};

export default ThemeSwitch;
