import Logo from "../Logo/Logo";

import { Flex } from "@chakra-ui/react";
import NavbarControls from "../NavbarControls/NavbarControls";

const Navbar = () => {
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
      }}
    >
      <Flex
        bgColor="brand.white"
        align="center"
        justify="space-between"
        w="100%"
        h="7vh"
        p="1rem"
      >
        <Logo props={{ color: "brand.gray" }} />
        <NavbarControls />
      </Flex>
    </nav>
  );
};

export default Navbar;
