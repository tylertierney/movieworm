import { VStack, Container, Flex, useColorModeValue } from "@chakra-ui/react";

import { useState } from "react";

import BrandedHeading from "../../../components/BrandedHeading";
import BrandedButton from "../../../components/BrandedButton/BrandedButton";
import BrandedInput from "../../../components/BrandedInput";

import useInput from "../../../hooks/useInput";
import axios from "axios";

import { useLocalUser } from "../../../context/authContext";

const JoinGroup = () => {
  const { localUser } = useLocalUser();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    await axios
      .post(`/api/user/${localUser._id}/${groupid.value}/joingroup`, {
        username: username.value,
      })
      .then((res) => {
        console.log(res);
        // window.location = "/";
      })
      .catch((err) => console.log(err));

    setIsLoading(false);
  };

  const groupid = useInput("");
  const username = useInput("");

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
      <VStack spacing={6} color={textColor} p="1rem 0rem">
        <Flex w="100%" direction="column" align="center">
          <BrandedHeading props={{ m: "0rem 0rem 0.5rem 0rem" }}>
            Join a Group
          </BrandedHeading>

          <Container
            maxW="500px"
            p="2rem 1rem"
            borderRadius="lg"
            boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.3)"
          >
            <VStack align="center" spacing={5}>
              <BrandedInput
                name="Group ID"
                state={groupid}
                isLoading={isLoading}
                type="text"
                formLabel="1. Enter a Group ID"
              />
              <BrandedInput
                name="Username"
                state={username}
                isLoading={isLoading}
                type="text"
                formLabel="2. Enter a username"
                helperText="This is how you will appear to other members in the group."
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
  );
};

export default JoinGroup;
