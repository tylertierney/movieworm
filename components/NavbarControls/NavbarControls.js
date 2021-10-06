import { Flex } from "@chakra-ui/react";
import BrandedButton from "../BrandedButton/BrandedButton";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import { useState } from "react";
import { useUser } from "../../context/authContext";
// import UserMenu from "./UserMenu";

const NavbarControls = () => {
  // const [loginDisabled, setLoginDisabled] = useState(false);
  // const [signupDisabled, setSignupDisabled] = useState(false);

  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  const { user } = useUser();

  return (
    <Flex align="center" justify="center" h="100%">
      <ThemeSwitch />

      {/* <BrandedButton
            props={{ margin: "0px 4px", maxH: "80%" }}
            variant="ghost"
            color="none"
            action="link"
            href="/login"
            isLoading={loginIsLoading}
            setIsLoading={setLoginIsLoading}
          >
            Log In
          </BrandedButton> */}
      <BrandedButton
        variant="solid"
        color="primary"
        action="link"
        href="/signup"
        props={{ margin: "0px 4px", size: "sm" }}
        isLoading={signupIsLoading}
        setIsLoading={setSignupIsLoading}
      >
        Log In
      </BrandedButton>
    </Flex>
  );
};

export default NavbarControls;
