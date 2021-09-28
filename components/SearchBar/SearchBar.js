import { Input, InputGroup, InputRightAddon, Icon } from "@chakra-ui/react";
import { useState } from "react";

import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputRightAddon></InputRightAddon>
    </InputGroup>
  );
};

export default SearchBar;
