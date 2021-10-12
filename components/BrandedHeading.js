import { Heading, Text } from "@chakra-ui/react";
import emojiTree from "emoji-tree";

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

  // Find any emojis and replace them with a different text component,
  // so that backgroundClip doesn't render them as a solid block

  const headingArray = emojiTree(children);

  let headingToString = [];
  headingArray.forEach((char, index) => {
    if (char.type === "text") {
      headingToString.push(char.text);
    } else {
      headingToString.push(
        <Text as="span" key={index}>
          {char.text}
        </Text>
      );
    }
  });

  return (
    <Heading
      size={props?.size ? props.size : "2xl"}
      bgGradient={bgGradient}
      bgClip="text"
      maxW="480px"
      mb="0.9rem"
      {...props}
      p="0.3rem 0.4rem"
    >
      {headingToString}
    </Heading>
  );
};

export default BrandedHeading;
