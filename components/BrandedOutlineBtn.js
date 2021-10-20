import { Flex, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const BrandedOutlineBtn = ({ children, props }) => {
  let bgGradient;
  switch (props?.color) {
    case "red":
      bgGradient = "linear(to-r, red.400,pink.400)";

      break;
    case "blue":
      bgGradient = "linear(to-r, brand.primary.1000,lightblue)";
      break;
    default:
      bgGradient = "linear(to-r, brand.primary.1000,lightblue)";
  }

  return (
    <Flex
      h="3rem"
      backgroundColor="red"
      justify="center"
      align="center"
      borderRadius="30px"
      bgGradient={bgGradient}
      {...props}
    >
      <Button
        backgroundColor={useColorModeValue("brand.white", "brand.gray")}
        variant="outline"
        borderRadius="30px"
        h="96%"
        w="98%"
        color={useColorModeValue("gray.500", "brand.text.light")}
      >
        {children}
      </Button>
    </Flex>
  );
};

export default BrandedOutlineBtn;
