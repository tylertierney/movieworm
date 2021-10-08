import {
  Input,
  InputGroup,
  VStack,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Text,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

// import { useUser } from "../context/authContext";

import { useUser } from "@auth0/nextjs-auth0";

import useInput from "../hooks/useInput";
import { useState } from "react";

import BrandedButton from "../components/BrandedButton/BrandedButton";

import BrandedInput from "../components/BrandedInput";

const Login = () => {
  const { login } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const email = useInput("");
  const password = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <VStack mt="10vh">
        <Heading textAlign="center">Log In</Heading>

        <Text textAlign="center">Use this form to log into your account</Text>
        <br />
        <Container
          maxW="500px"
          p="2rem 1rem"
          borderRadius="lg"
          boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.3)"
        >
          <VStack align="center" spacing={5}>
            <BrandedInput
              name="Email"
              state={email}
              isLoading={isLoading}
              type="email"
            />
            <BrandedInput
              name="Password"
              state={password}
              isLoading={isLoading}
              type="password"
            />
            <BrandedButton
              disabled={isLoading}
              action="submit"
              props={{ width: "100%" }}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            >
              Log In
            </BrandedButton>
          </VStack>
        </Container>
      </VStack>
    </form>
  );
};

export default Login;
