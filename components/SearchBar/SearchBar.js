import { Input, InputGroup, InputRightAddon, Icon } from "@chakra-ui/react";
import { useState } from "react";

import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  // const searchurl =
  //   "https://api.themoviedb.org/3/search/movie?api_key=8d4d1ae4d36603cf91dacea6e5205197&language=en-US&query=fight&page=1&include_adult=false";

  // fetch(searchurl)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

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
