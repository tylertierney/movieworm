import { Flex, Icon, Text } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { AiOutlineFrown, AiOutlineSmile } from "react-icons/ai";

const ConfirmationMessage = ({
  confirmation,
  onOpen,
  isOpen,
  onClose,
  bgColor,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={bgColor}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex borderRadius="lg" direction="column" align="center">
            <Icon
              as={confirmation === "Error" ? AiOutlineFrown : AiOutlineSmile}
              fontSize="3rem"
            />
            <Text textAlign="center" maxW="300px">
              {confirmation === "Error"
                ? "Sorry, there was an error. Please try again later."
                : "Success! Your review has been submitted.\nYou may have to reload the page to view your changes."}
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationMessage;
