import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { FiEdit } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { generateKey } from "../utils/helperFunctions";

const IconList = ({ items, props }) => {
  const iconBgColor = useColorModeValue("brand.white", "gray.600");

  const listItemArray = items.map((item, index) => {
    let icon;

    switch (item.icon) {
      case "FiEdit":
        icon = FiEdit;
        break;
      case "BsChatDots":
        icon = BsChatDots;
        break;
      case "HiOutlineDocumentReport":
        icon = HiOutlineDocumentReport;
        break;
      default:
        icon = BiSpreadsheet;
    }

    return (
      <ListItem mb="0.4rem" key={generateKey()}>
        <Flex
          maxW={["100%", "", "300px"]}
          justify="center"
          align="center"
          p="1rem"
          direction={["row", "row", "column"]}
        >
          <ListIcon
            mb={["0", "0", "1rem"]}
            as={icon}
            fontSize="3rem"
            color="brand.primary.1000"
            borderRadius="50%"
            boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.2)"
            p="0.6rem 0"
            backgroundColor={iconBgColor}
            // border="solid pink 1px"
          />
          <Text
            p="0.6rem 0"
            // border="solid blue 1px"
            textAlign={["left", "left", "center"]}
            as="span"
            maxW={["380px"]}
          >
            {item.text}
          </Text>
        </Flex>
      </ListItem>
    );
  });

  return (
    <List
      //some
      {...props}
      w="100%"
    >
      <Flex
        w="100%"
        direction={["column", "column", "row"]}
        justifyContent="space-around"
        alignItems="flex-start"
      >
        {listItemArray}
      </Flex>
    </List>
  );
};

export default IconList;
