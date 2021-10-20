import { Flex, Button } from "@chakra-ui/react";
import SearchIcon from "../SearchIcon/SearchIcon";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useLocalUser } from "../../context/authContext";

const NavbarControls = () => {
  const { localUser } = useLocalUser();

  return (
    <Flex align="center" justify="center" h="100%">
      <SearchIcon />
      <ThemeSwitch />

      {localUser && localUser.email ? (
        <UserMenu />
      ) : (
        <Link href="/api/auth/login" passHref>
          <Button
            variant="solid"
            _hover={{ opacity: "0.7" }}
            transition="0.3s ease-in-out"
            backgroundColor="brand.primary.1000"
            color="white"
            textShadow="1px 1px rgb(0, 0, 0, 0.3)"
            size="sm"
            maxH="1.5rem"
          >
            Log In
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default NavbarControls;
