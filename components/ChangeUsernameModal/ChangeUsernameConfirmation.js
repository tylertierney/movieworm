import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  Text,
  Flex,
} from "@chakra-ui/react";

import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const RemoveMemberConfirmation = ({
  confirmationIsOpen,
  confirmationOnOpen,
  confirmationOnClose,
  group,
  bgColor,
  confirmation,
  username,
}) => {
  const handleClose = () => {
    confirmationOnClose();
    window.location = "/";
  };

  return (
    <Modal isOpen={confirmationIsOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bgColor={bgColor}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {confirmation === "success" ? (
            <Flex direction="column" align="center">
              <Icon
                as={AiOutlineCheckCircle}
                color="lightgreen"
                fontSize="3rem"
              />
              <br />
              <Text textAlign="center">{`You have successfully changed your username to ${username} in ${group.name}`}</Text>
            </Flex>
          ) : (
            <Flex direction="column" align="center">
              <Icon as={AiOutlineCloseCircle} color="red" fontSize="3rem" />
              <br />
              <Text textAlign="center">
                There was an error, please try again later
              </Text>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RemoveMemberConfirmation;
