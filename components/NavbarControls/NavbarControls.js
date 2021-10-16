import { Flex, Button } from "@chakra-ui/react";
import SearchBar from "../SearchBar/SearchBar";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0";
import UserMenu from "./UserMenu";
import Link from "next/link";
import { useLocalUser } from "../../context/authContext";

const NavbarControls = () => {
  // const [loginDisabled, setLoginDisabled] = useState(false);
  // const [signupDisabled, setSignupDisabled] = useState(false);

  // const [loginIsLoading, setLoginIsLoading] = useState(false);
  // const [signupIsLoading, setSignupIsLoading] = useState(false);

  const { localUser } = useLocalUser();

  return (
    <Flex align="center" justify="center" h="100%">
      <SearchBar />
      <ThemeSwitch />

      {localUser ? (
        <UserMenu />
      ) : (
        <Link href="/api/auth/login" passHref>
          <Button
            variant="solid"
            _hover={{ opacity: "0.7" }}
            transition="0.3s ease-in-out"
            backgroundColor="brand.primary.1000"
            color="brand.white"
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
