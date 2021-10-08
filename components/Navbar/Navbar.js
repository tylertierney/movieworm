import Logo from "../Logo/Logo";

import { Flex, useColorModeValue, Box } from "@chakra-ui/react";
import NavbarControls from "../NavbarControls/NavbarControls";
import router from "next/router";

const Navbar = () => {
  const bgColor = useColorModeValue("brand.white", "brand.darkgray");
  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  return (
    <nav
      style={{
        boxShadow: "0px 0px 20px 1px rgb(0, 0, 0, 0.3)",
        position: "fixed",
        minWidth: "100vw",
        width: "100%",
        top: "0",
        left: "0",
        zIndex: 1000,
        height: "7vh",
        minHeight: "7vh",
      }}
    >
      <Flex
        bgColor={bgColor}
        color={textColor}
        align="center"
        justify="space-between"
        w="100%"
        h="7vh"
        pl="0.5rem"
        pr="1.2rem"
      >
        <Box width="100px" cursor="pointer" onClick={() => router.push("/")}>
          <Logo />
        </Box>

        <NavbarControls />
      </Flex>
    </nav>
  );
};

export default Navbar;
