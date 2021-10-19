import { Flex, Avatar, Text } from "@chakra-ui/react";

import { getMemberInfoFromUserID } from "../../utils/helperFunctions";

import { useEffect } from "react";

const Review = ({ review, group }) => {
  if (review === null || review === undefined) {
    return null;
  }

  const postedAtDate = () => {
    if (review.postedAt === null || review.postedAt === undefined) {
      return null;
    }

    return new Date(review.postedAt).toLocaleDateString();
  };

  if (getMemberInfoFromUserID(review.userid, group.members) === null) {
    return null;
  }

  const { username, prof_pic, userid } = getMemberInfoFromUserID(
    review.userid,
    group.members
  );

  return (
    <Flex
      direction="column"
      border="solid 1px"
      borderColor="brand.primary.1000"
      borderRadius="lg"
      p="0.5rem 0.5rem 0.1rem 0.5rem"
      boxShadow="5px 3px 20px 1px rgb(0, 0, 0, 0.2)"
      mb="1rem"
    >
      <Flex pb="0.5rem" align="center" justify="space-between">
        <Flex align="center">
          <Avatar src={prof_pic} size="xs" name={username} mr="0.6rem" />
          <Text fontSize="0.8rem">{username}</Text>
        </Flex>

        <Flex align="baseline">
          <Text fontSize="1rem">{review.rating}</Text>
          <Text fontSize="0.6rem">/10</Text>
        </Flex>
      </Flex>

      {review.reviewText.length > 0 ? (
        <>
          <Text fontSize="0.8rem">&quot;{review.reviewText}&quot;</Text>
          <Flex pt="0.5rem" pb="0.5rem" align="center" justify="flex-end">
            <Text fontSize="0.5rem">{postedAtDate()}</Text>
          </Flex>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default Review;
