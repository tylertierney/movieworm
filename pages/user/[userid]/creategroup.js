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
  FormHelperText,
} from "@chakra-ui/react";

import { useState } from "react";

import BrandedHeading from "../../../components/BrandedHeading";
import BrandedButton from "../../../components/BrandedButton/BrandedButton";
import BrandedInput from "../../../components/BrandedInput";

import useInput from "../../../hooks/useInput";
import axios from "axios";

import { useLocalUser } from "../../../context/authContext";
import router from "next/router";

const generateID = () => {
  return Math.random().toString(16).substr(2, 16);
};

const CreateGroup = () => {
  const { localUser } = useLocalUser();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [isLoading, setIsLoading] = useState(false);

  const [idIsCopied, setIdIsCopied] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    // axios
    //   .post(`/api/user/${localUser._id}/creategroup`, {
    //     groupname: groupname.value,
    //     group_id,
    //     username: username.value,
    //   })
    //   .then((res) => {
    //     window.location = "/";
    //   })
    //   .catch((err) => console.log(err));
    window.location = "/";
  };

  const groupname = useInput("");
  const username = useInput("");

  //   const generateID = () => {
  //     return Math.random().toString(16).substr(2, 16);
  //   };
  const [group_id, setGroup_id] = useState(() => generateID());

  const copyID = () => {
    setIdIsCopied(true);
    navigator.clipboard.writeText(group_id);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{ width: "100%" }}>
      <VStack spacing={6} color={textColor}>
        <Flex w="100%" direction="column" align="center">
          <BrandedHeading props={{ m: "0rem 0rem 0.5rem 0rem" }}>
            Create a Group
          </BrandedHeading>

          <Container
            maxW="500px"
            p="2rem 1rem"
            borderRadius="lg"
            boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.3)"
          >
            <VStack align="center" spacing={5}>
              <BrandedInput
                name="Name"
                state={groupname}
                isLoading={isLoading}
                type="text"
                helperText="Max 20 characters"
                formLabel="1. Give your group a name"
              />
              <BrandedInput
                name="Username"
                state={username}
                isLoading={isLoading}
                type="text"
                helperText="This is how you will appear to other members"
                formLabel="2. Select a username to use in your group"
              />
              <FormControl>
                <FormLabel mb="0">
                  3. Copy your group ID to share with your friends
                </FormLabel>
                <FormHelperText textAlign="right">
                  {idIsCopied ? "Copied!" : " "}
                </FormHelperText>
                <InputGroup flexDirection="column">
                  <Input value={group_id} type="text" isReadOnly={true} />
                  <InputRightElement>
                    <Button
                      onClick={(e) => {
                        copyID();
                      }}
                      variant="ghost"
                      p="1rem 1.8rem"
                      size="sm"
                      mr="1.8rem"
                      _focus={{ outline: "none" }}
                      color="brand.text.light"
                    >
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
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

export default CreateGroup;
