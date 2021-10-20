import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
  FormHelperText,
  Textarea,
  Divider,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  Box,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useLocalUser } from "../../context/authContext";

import axios from "axios";

import { findDirectors } from "../../utils/helperFunctions";

import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";

const ReviewModal = ({ isOpen, onClose, movieDetails, credits, group }) => {
  const { onOpen } = useDisclosure();

  const {
    adult,
    backdrop_path,
    genre_ids,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
  } = movieDetails;

  const {
    isOpen: confirmationIsOpen,
    onOpen: confirmationOnOpen,
    onClose: confirmationOnClose,
  } = useDisclosure();

  const [reviewText, setReviewText] = useState("");

  const { localUser, createReviewInLocalUser } = useLocalUser();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const currentDate = new Date();

    const reviewObject = {
      userid: localUser._id,
      reviewText,
      rating,
      movieDetails,
      postedAt: currentDate,
    };

    await axios
      .post(`api/user/${localUser._id}/${group._id}/createreview`, reviewObject)
      .then((res) => {
        setRating(0);
        setReviewText("");
        createReviewInLocalUser(reviewObject);
        setConfirmation(() => "Success");
        confirmationOnOpen();
      })
      .catch((err) => {
        setConfirmation(() => "Error");
        confirmationOnOpen();
        console.log(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setRating(0);
    setReviewText("");
  }, [title]);

  const modalSubmitDisabled = () => {
    if (localUser === null || localUser === undefined) {
      return true;
    }

    if (isLoading) {
      return true;
    }

    if (group === null || group === undefined) {
      return true;
    }

    return false;
  };

  const bgColor = useColorModeValue("brand.white", "brand.gray");

  const handleClose = () => {
    setConfirmation("");
    onClose();
  };

  let needsTruncation = false;

  if (overview !== undefined) {
    if (overview.length > 264) {
      needsTruncation = true;
    }
  }

  const [seeingMore, setSeeingMore] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent bgColor={bgColor}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalHeader>
            <Flex w="100%" mb="1rem">
              <Image
                alt={`${title} poster`}
                src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                w={140}
                maxH="200px"
              />
              <Flex direction="column" p="0.5rem 0.5rem">
                <Text fontSize="0.9rem">{title}</Text>
                <Text
                  fontSize="0.7rem"
                  fontWeight="thin"
                  mb="0.5rem"
                  className={`reviewModalOverview ${
                    seeingMore ? "noclamp" : "clamp"
                  }`}
                >
                  {overview}
                </Text>
                {needsTruncation && (
                  <Text
                    fontWeight="light"
                    fontSize="0.7rem"
                    cursor="pointer"
                    onClick={() => setSeeingMore(!seeingMore)}
                    textDecoration="underline"
                    userSelect="none"
                    textAlign="right"
                    mb="0.6rem"
                    w="100%"
                  >
                    See {seeingMore ? "Less" : "More"}
                  </Text>
                )}
                <Text fontSize="0.7rem">
                  {findDirectors(credits).multipleDirectors
                    ? "Directors:"
                    : "Director:"}
                  &nbsp;
                  {credits === null ? <></> : findDirectors(credits).list}
                </Text>
              </Flex>
            </Flex>
            <Divider />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody color={textColor}>
            <FormLabel m="0" color="inherit">
              Group
            </FormLabel>
            <Input
              isReadOnly={true}
              isDisabled
              value={group?.name}
              type="text"
              mb="1rem"
            />
            <FormControl>
              <Flex align="center" justify="space-between" mb="0.2rem">
                <FormLabel m="0" color="inherit">
                  Rating
                </FormLabel>
                <FormHelperText
                  opacity="0.7"
                  fontSize="0.7rem"
                >{`${rating}/10`}</FormHelperText>
              </Flex>
              <NumberInput
                defaultValue={0}
                max={10}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(e)}
                mb="1rem"
                isDisabled={isLoading}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <Flex align="center" justify="space-between" mb="0.2rem">
                <FormLabel m="0" color="inherit">
                  Review
                </FormLabel>

                <FormHelperText opacity="0.7" fontSize="0.7rem">
                  {`${reviewText.length}/1000 characters`}
                </FormHelperText>
              </Flex>
              <Textarea
                isDisabled={isLoading}
                maxLength="1000"
                color="inherit"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter p="1rem">
            <Button
              variant="ghost"
              transition="0.3s ease-in-out"
              color={textColor}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>

            <Tooltip
              fontSize="0.7rem"
              label={
                modalSubmitDisabled()
                  ? "Log in and create a group to save your reviews"
                  : ""
              }
              placement="top"
            >
              <Box>
                <Button
                  transition="0.3s ease-in-out"
                  variant="solid"
                  color="brand.white"
                  bgColor="brand.primary.1000"
                  type="submit"
                  _hover={{
                    opacity: "0.6",
                  }}
                  isDisabled={modalSubmitDisabled()}
                >
                  Submit
                </Button>
              </Box>
            </Tooltip>
          </ModalFooter>
        </form>
      </ModalContent>
      {confirmation && (
        <ConfirmationMessage
          bgColor={bgColor}
          confirmation={confirmation}
          onOpen={confirmationOnOpen}
          isOpen={confirmationIsOpen}
          onClose={handleClose}
        />
      )}
    </Modal>
  );
};

export default ReviewModal;
