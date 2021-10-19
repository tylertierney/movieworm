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

import { useState } from "react";

const RemoveMemberConfirmation = ({
  member,
  group,
  isOpen,
  onOpen,
  onClose,
  bgColor,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const textColor = useColorModeValue("brand.text.light", "brand.text.dark");

  const removeMember = (memberID) => {
    setIsLoading(true);
    console.log(group);

    axios
      .post(`/api/user/${memberID}/${group.group_id}/removemember`)
      .then((res) => {
        setIsLoading(false);
        window.location = "/";
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
  );
};

export default RemoveMemberConfirmation;
