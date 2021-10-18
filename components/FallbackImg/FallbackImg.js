import { Image, Box, Flex, Text } from "@chakra-ui/react";

const FallbackImg = ({ alt }) => {
  return (
    <Box w={40} minW={40} minH="240px" h="240px" className="fallbackImg">
      <Flex justify="center" align="center" w="100%" h="100%" minH="100%">
        <Text fontSize="1.1rem" color="brand.text.dark">
          {alt}
        </Text>
      </Flex>
    </Box>
  );
};

export default FallbackImg;
