import { useColorModeValue, Box } from "@chakra-ui/react";

const LoadingIcon = () => {
  const loaderColor = useColorModeValue("brand.text.dark", "brand.white");

  return (
    <div className="loadingIcon">
      <Box as="span" w="8px" h="8px" bgColor={loaderColor}></Box>
      <Box as="span" w="8px" h="8px" bgColor={loaderColor}></Box>
      <Box as="span" w="8px" h="8px" bgColor={loaderColor}></Box>
    </div>
  );
};

export default LoadingIcon;
