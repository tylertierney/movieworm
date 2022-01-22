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
  Divider,
} from "@chakra-ui/react";

import useInput from "../hooks/useInput";
import { useState } from "react";

import BrandedButton from "../components/BrandedButton/BrandedButton";

import BrandedInput from "../components/BrandedInput";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const email = useInput("");
  const password = useInput("");
  const confirmPW = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <VStack mt="10vh">
        <Heading textAlign="center">Sign Up</Heading>

        <Text textAlign="center">
          Join millions of users from around the world
        </Text>
        <br />
        <Container
          maxW="500px"
          p="2rem 1rem"
          borderRadius="lg"
          boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.3)"
        >
          <VStack align="center" spacing={5}>
            <BrandedInput
              name="First Name"
              state={firstName}
              isLoading={isLoading}
              type="text"
            />
            <BrandedInput
              name="Last Name"
              state={lastName}
              isLoading={isLoading}
              type="text"
            />
            <Divider />
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
            <BrandedInput
              name="Confirm Password"
              state={confirmPW}
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
              Confirm
            </BrandedButton>
          </VStack>
        </Container>
      </VStack>
    </form>
  );
};

export default Login;
