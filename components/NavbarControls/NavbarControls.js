import { Flex, Button } from "@chakra-ui/react";
import BrandedButton from "../BrandedButton/BrandedButton";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { useState } from "react";
// import { useUser } from "../../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";
import UserMenu from "./UserMenu";
import Link from "next/link";

const NavbarControls = () => {
  // const [loginDisabled, setLoginDisabled] = useState(false);
  // const [signupDisabled, setSignupDisabled] = useState(false);

  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  const { user } = useUser();

  return (
    <Flex align="center" justify="center" h="100%">
      <ThemeSwitch />

      {user ? (
        <UserMenu user={user} />
      ) : (
        <Link href="/api/auth/login" passHref>
          {/* <BrandedButton
            variant="solid"
            color="primary"
            action="link"
            href="/authentication"
            props={{ margin: "0px 4px", size: "sm" }}
            isLoading={signupIsLoading}
            setIsLoading={setSignupIsLoading}
          >
            Log In
          </BrandedButton> */}
          <Button
            variant="solid"
            _hover={{ opacity: "0.7" }}
            transition="0.3s ease-in-out"
            backgroundColor="brand.primary.1000"
            color="brand.white"
            size="sm"
            maxH="1.5rem"
            // h="96%"
          >
            Log In
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default NavbarControls;
