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
  Avatar,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";

import axios from "axios";

import { AiOutlineEdit } from "react-icons/ai";

import EditUserInfoConfirmation from "./EditUserInfoConfirmation";

const EditUserInfoModal = ({ group, member, bgColor }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [username, setUsername] = useState(member.username);
  const [confirmation, setConfirmation] = useState("");

  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    let amazonURL = "";

    if (profilePicFile !== null) {
      amazonURL = await axios
        .get(`/api/user/${member.userid}/${group.group_id}/s3`)
        .then((res) => res.data.data)
        .catch((err) => {
          console.log(err);
        });

      if (amazonURL === undefined || amazonURL === null) {
        setConfirmation(() => "error");
        setIsLoading(() => false);
        confirmationOnOpen();
        return;
      }

      const sendFileToS3 = (file, s3url) => {
        let config = { headers: { "Content-Type": "multipart/form-data" } };

        axios
          .put(s3url, file, config)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      };

      sendFileToS3(profilePicFile, amazonURL);
      amazonURL = amazonURL.split("?")[0];

      console.log(amazonURL);
    }

    axios
      .post(`/api/user/${member.userid}/${group.group_id}/edituserinfo`, {
        newUsername: username,
        newProfPicURL: amazonURL,
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(() => false);
        setConfirmation(() => "success");
        confirmationOnOpen();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(() => false);
        setConfirmation(() => "error");
        confirmationOnOpen();
      });
  };

  const [profilePicPreviewURL, setProfilePicPreviewURL] = useState(
    member.prof_pic
  );
  const [profilePicFile, setProfilePicFile] = useState(null);

  const handleProfilePicUpload = (e) => {
    let imagefile = e.target.files[0];
    if (imagefile) {
      let url = URL.createObjectURL(imagefile);
      setProfilePicPreviewURL(() => url);
      setProfilePicFile(() => imagefile);
    }
  };

  return (
    <>
      <Button
        borderColor={textColor}
        size="sm"
        variant="outline"
        onClick={onOpen}
      >
        <Icon color={textColor} as={AiOutlineEdit} />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={bgColor}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <ModalHeader>Edit Username + Profile Pic</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <br />
              <Flex align="center" w="100%">
                <Avatar
                  src={profilePicPreviewURL}
                  name={username}
                  size="xl"
                  mr="1rem"
                />
                <Box
                  borderRadius="6px"
                  cursor="pointer"
                  border="1px solid"
                  borderColor="brand.primary.1000"
                  minW="7rem"
                  p="0.3rem 0.5rem"
                >
                  <label htmlFor="profile_pic" style={{ cursor: "pointer" }}>
                    Choose File
                  </label>
                </Box>
                <input
                  id="profile_pic"
                  type="file"
                  accept="image/*"
                  style={{
                    border: "solid blue 1px",
                    opacity: "1",
                    visibility: "hidden",
                    fontSize: "inherit",
                  }}
                  onChange={(e) => handleProfilePicUpload(e)}
                />
              </Flex>
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
      <EditUserInfoConfirmation
        group={group}
        confirmationIsOpen={confirmationIsOpen}
        confirmationOnOpen={confirmationOnOpen}
        confirmationOnClose={confirmationOnClose}
        confirmation={confirmation}
        username={username}
        bgColor={bgColor}
      />
    </>
  );
};

export default EditUserInfoModal;
