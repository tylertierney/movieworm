import {
  Flex,
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
} from "@chakra-ui/react";

import { useState } from "react";

import axios from "axios";

import LeaveGroupConfirmation from "./LeaveGroupConfirmation";

const LeaveGroupModal = ({ group, userid, bgColor }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("brand.text.light", "brand.text.dark");

  const [confirmation, setConfirmation] = useState("");

  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`/api/user/${userid}/${group.group_id}/leavegroup`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setConfirmation(() => "success");
        confirmationOnOpen();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setConfirmation(() => "error");
        confirmationOnOpen();
      });

    setIsLoading(false);
  };

  const buttonColor = useColorModeValue("#feb2b2", "#c53030");

  return (
    <>
      <Button variant="outline" colorScheme="red" size="xs" onClick={onOpen}>
        Leave Group
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>Leave Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text textAlign="center">{`Are you sure you want to leave ${group.name}? All of your reviews in this group will be permanently deleted.`}</Text>
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
                variant="outline"
                colorScheme="red"
                type="submit"
                _hover={{
                  opacity: "0.6",
                }}
              >
                Leave Group
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <LeaveGroupConfirmation
        group={group}
        confirmationIsOpen={confirmationIsOpen}
        confirmationOnOpen={confirmationOnOpen}
        confirmationOnClose={confirmationOnClose}
        confirmation={confirmation}
        bgColor={bgColor}
      />
    </>
  );
};

export default LeaveGroupModal;
