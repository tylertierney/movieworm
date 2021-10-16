import { useColorModeValue, Box } from "@chakra-ui/react";

const LoadingIcon = () => {
  const loaderColor = useColorModeValue("brand.gray", "brand.white");

  return (
    <div className="loadingIcon">
      <Box as="span" bgColor={loaderColor}></Box>
      <Box as="span" bgColor={loaderColor}></Box>
      <Box as="span" bgColor={loaderColor}></Box>
    </div>
  );
};

export default LoadingIcon;
