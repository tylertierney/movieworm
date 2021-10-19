import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

import { useState } from "react";

import axios from "axios";

import { AiOutlineEdit } from "react-icons/ai";

const ChangeUsernameModal = ({ localUser, member }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("brand.text.light", "brand.text.dark");
  const bgColor = useColorModeValue("brand.white", "brand.gray");

  const [username, setUsername] = useState(member.username);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (username.length === 0) {
      return;
    }

    axios
      .post(
        `/api/user/${member.userid}/${localUser.activeGroup.group_id}/changeusername`,
        { newUsername: username }
      )
      .then((res) => {
        setIsLoading(() => false);
        if (window != null && window != undefined) {
          console.log(res);
          //   window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(() => false);
      });
  };

  return (
    <>
      <Button size="sm" variant="outline" onClick={onOpen}>
        <Icon color={textColor} as={AiOutlineEdit} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>Edit Username</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                transition="0.3s ease-in-out"
                color={textColor}
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                isDisabled={isLoading}
                transition="0.3s ease-in-out"
                variant="solid"
                color="brand.white"
                bgColor="brand.primary.1000"
                type="submit"
                _hover={{
                  opacity: "0.6",
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeUsernameModal;
