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
  Heading,
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

import { useState } from "react";

import useInput from "../../hooks/useInput";

import BrandedSubheading from "../BrandedSubheading";

import { useLocalUser } from "../../context/authContext";

import { findActiveGroup } from "../../utils/helperFunctions";

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

  const reviewText = useInput("");

  const { localUser } = useLocalUser();

  const textColor = useColorModeValue("brand.text.dark", "brand.text.light");

  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
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
              value={findActiveGroup(localUser).name}
              type="text"
              mb="1rem"
            />
            <FormControl>
              <FormLabel m="0" color="inherit">
                Rating
              </FormLabel>
              <FormHelperText
                pr="0.5rem"
                textAlign="right"
                pb="0.2rem"
                opacity="0.7"
                fontSize="0.7rem"
                m="0"
              >{`${rating}/10`}</FormHelperText>
              <NumberInput
                defaultValue={0}
                max={10}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(e)}
                mb="1rem"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl isInvalid={reviewText.value.length > 1000}>
              <FormLabel m="0" color="inherit">
                Review
              </FormLabel>
              <FormHelperText
                pr="0.5rem"
                textAlign="right"
                pb="0.2rem"
                opacity="0.7"
                fontSize="0.7rem"
                m="0"
              >
                {`${reviewText.value.length}/1000 characters`}
              </FormHelperText>
              <Textarea
                maxLength="1000"
                color="inherit"
                value={reviewText.value}
                onChange={reviewText.onChange}
              ></Textarea>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" color={textColor} mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              color="brand.white"
              bgColor="brand.primary.1000"
              type="submit"
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
