import { useColorModeValue, Box, Flex, Text } from "@chakra-ui/react";

const LoadingScreen = ({ status }) => {
  const loaderColor = useColorModeValue("brand.text.dark", "brand.white");

  return (
    <Flex justify="center" align="center" w="100%" h="100vh">
      {status === "loading" ? (
        <div className="loadingIcon">
          <Box as="span" w="18px" h="18px" bgColor={loaderColor}></Box>
          <Box as="span" w="18px" h="18px" bgColor={loaderColor}></Box>
          <Box as="span" w="18px" h="18px" bgColor={loaderColor}></Box>
        </div>
      ) : (
        <Text fontSize="1.3rem">There was an error</Text>
      )}
    </Flex>
  );
};

export default LoadingScreen;
