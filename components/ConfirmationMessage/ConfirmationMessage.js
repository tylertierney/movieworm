import {
  Flex,
  Icon,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import axios from "axios";

import { AiOutlineFrown, AiOutlineSmile } from "react-icons/ai";

import { useState } from "react";

const ConfirmationMessage = ({
  modalHeader,
  modalBody,
  confirmation,
  onOpen,
  isOpen,
  onClose,
  bgColor,
  action,
  actionText,
  memberID,
  group,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const textColor = useColorModeValue("brand.text.light", "brand.text.dark");

  console.log(action);

  const removeMember = (memberID) => {
    setIsLoading(true);
    console.log(group);

    axios
      .post(`/api/user/${memberID}/${group.group_id}/removemember`)
      .then((res) => {
        setIsLoading(false);
        window.location("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={bgColor}>
        <ModalHeader>{modalHeader}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {confirmation && (
            <Flex borderRadius="lg" direction="column" align="center">
              <Icon
                as={confirmation === "Error" ? AiOutlineFrown : AiOutlineSmile}
                fontSize="3rem"
              />
              <Text textAlign="center" maxW="300px">
                {confirmation === "Error"
                  ? "Sorry, there was an error. Please try again later."
                  : "Success! Your review has been submitted. It's now visible in your current group."}
              </Text>
            </Flex>
          )}
          {modalBody}
        </ModalBody>
        <ModalFooter>
          {action && (
            <>
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
                onClick={() => removeMember(memberID)}
                variant="outline"
                colorScheme="red"
                size="sm"
                isDisabled={isLoading}
              >
                {actionText}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationMessage;
