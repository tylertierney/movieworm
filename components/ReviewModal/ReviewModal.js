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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useLocalUser } from "../../context/authContext";

import { findActiveGroup } from "../../utils/helperFunctions";

import axios from "axios";

const ReviewModal = ({
  onOpen,
  isOpen,
  onClose,
  movieDetails,
  multipleDirectors,
  findDirectors,
  credits,
  setMultipleDirectors,
}) => {
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

  const [reviewText, setReviewText] = useState("");

  const { localUser } = useLocalUser();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [rating, setRating] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeGroup = findActiveGroup(localUser);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    axios
      .post(`api/user/${localUser._id}/${activeGroup._id}/createreview`, {
        reviewText: reviewText,
        rating,
        movieDetails,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    setRating(0);
    setReviewText("");
  }, [title]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor={useColorModeValue("brand.white", "brand.gray")}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalHeader>
            <Flex w="100%" mb="1rem">
              <Image
                src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
                w={140}
              />
              <Flex direction="column" p="0.5rem 0.5rem">
                <Text>{title}</Text>
                <Text fontSize="0.7rem" fontWeight="thin" mb="0.5rem">
                  {overview}
                </Text>

                <Text fontSize="0.7rem">
                  {multipleDirectors ? "Directors:" : "Director:"}&nbsp;
                  {credits === null ? <></> : findDirectors(credits.crew)}
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
              value={activeGroup.name}
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

          <ModalFooter>
            <Button
              _hover={{ opacity: "0.6" }}
              variant="ghost"
              transition="0.3s ease-in-out"
              color={textColor}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              transition="0.3s ease-in-out"
              variant="solid"
              color="brand.white"
              bgColor="brand.primary.1000"
              type="submit"
              _hover={{
                opacity: "0.6",
              }}
              isDisabled={isLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
