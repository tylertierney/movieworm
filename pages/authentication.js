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
  Flex,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import useInput from "../hooks/useInput";
import { useState } from "react";

import BrandedButton from "../components/BrandedButton/BrandedButton";

import BrandedInput from "../components/BrandedInput";
import BrandedHeading from "../components/BrandedHeading";

// import { useUser } from "../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";

const Authentication = () => {
  const { login, user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const username = useInput("");
  const password = useInput("");
  const group_id = useInput("");

  // const confirmPW = useInput("");
  // const firstName = useInput("");
  // const lastName = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    login();
  };

  const dividerColor = useColorModeValue("brand.gray", "brand.white");

  return (
    <>
      <VStack spacing={6} mb="2rem" paddingY="1rem">
        <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
          <VStack spacing={6}>
            <Flex w="100%" direction="column" align="center">
              <BrandedHeading props={{ m: "0rem 0rem 0.5rem 0rem" }}>
                Log In
              </BrandedHeading>

              <Container
                maxW="500px"
                p="2rem 1rem"
                borderRadius="lg"
                boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.3)"
              >
                <VStack align="center" spacing={5}>
                  <BrandedInput
                    name="Username"
                    state={username}
                    isLoading={isLoading}
                    type="text"
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
                    Confirm
                  </BrandedButton>
                </VStack>
              </Container>
            </Flex>
          </VStack>
        </form>
        <Flex justify="space-around" align="center" w="90%">
          <Box
            bgColor={dividerColor}
            opacity="0.5"
            w="40%"
            h="2px"
            borderRadius="lg"
          ></Box>
          <Text>or</Text>
          <Box
            opacity="0.5"
            bgColor={dividerColor}
            w="40%"
            h="2px"
            borderRadius="lg"
          ></Box>
        </Flex>
        {/* <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
          <VStack spacing={6}>
            <Flex w="100%" direction="column" align="center">
              <BrandedHeading props={{ m: "0rem 0rem 0.5rem 0rem" }}>
                Sign Up
              </BrandedHeading>

              <Text textAlign="center">
                Create or join a group to start reviewing movies
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
                    name="Username"
                    state={username}
                    isLoading={isLoading}
                    type="text"
                  />
                  <BrandedInput
                    name="Password"
                    state={password}
                    isLoading={isLoading}
                    type="password"
                  />
                  <Divider />
                  <BrandedInput
                    name="Group ID"
                    state={group_id}
                    isLoading={isLoading}
                    type="text"
                    helperText="Already have a Group ID? Enter it here to get started"
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
            </Flex>
          </VStack>
        </form> */}
      </VStack>
    </>
  );
};

export default Authentication;
