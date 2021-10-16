import {
  Input,
  InputGroup,
  InputRightAddon,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { BsSearch } from "react-icons/bs";

import { useLocalUser } from "../../context/authContext";

const SearchIcon = () => {
  const { setIsSearching } = useLocalUser();

  return (
    <Icon
      onClick={setIsSearching}
      as={BsSearch}
      color="brand.text.dark"
      cursor="pointer"
    />
  );
};

export default SearchIcon;
