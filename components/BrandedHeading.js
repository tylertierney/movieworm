import { Heading } from "@chakra-ui/react";

const BrandedHeading = ({ children, props }) => {
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
    <Heading
      size={props?.size ? props.size : "2xl"}
      bgGradient={bgGradient}
      bgClip="text"
      maxW="480px"
      mb="0.9rem"
      {...props}
      // textAlign="center"
      p="0.3rem 0.4rem"
    >
      {children}
    </Heading>
  );
};

export default BrandedHeading;
