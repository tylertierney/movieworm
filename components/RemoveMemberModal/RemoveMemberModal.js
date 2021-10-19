import {
  useDisclosure,
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

import RemoveMemberConfirmation from "./RemoveMemberConfirmation";

import axios from "axios";

import { useState } from "react";

const RemoveMemberModal = ({ member, group, bgColor }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  const textColor = useColorModeValue("brand.text.light", "brand.text.dark");

  const [confirmation, setConfirmation] = useState("");

  const removeMember = (memberID) => {
    setIsLoading(true);
    console.log(group);

    axios
      .post(`/api/user/${memberID}/${group.group_id}/removemember`)
      .then((res) => {
        setIsLoading(false);
        setConfirmation(() => "success");
        confirmationOnOpen();
      })
      .catch((err) => {
        setIsLoading(false);
        setConfirmation(() => "error");
        confirmationOnOpen();
        console.log(err);
      });
  };

  return (
    <>
      <Button variant="outline" onClick={onOpen} colorScheme="red" size="sm">
        Remove
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <ModalHeader>Hold on a sec there, pal...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {`Are you sure you want to remove ${member.username} from ${group.name}? Doing so will permanently delete all of the reviews they have posted to this group.`}
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
              onClick={() => removeMember(member.userid)}
              variant="outline"
              colorScheme="red"
              size="sm"
              isDisabled={isLoading}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <RemoveMemberConfirmation
        confirmationIsOpen={confirmationIsOpen}
        confirmationOnOpen={confirmationOnOpen}
        confirmationOnClose={confirmationOnClose}
        group={group}
        member={member}
        bgColor={bgColor}
        confirmation={confirmation}
      />
    </>
  );
};

export default RemoveMemberModal;
