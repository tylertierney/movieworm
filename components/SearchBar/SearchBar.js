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

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { setIsSearching } = useLocalUser();

  // const searchurl =
  //   "https://api.themoviedb.org/3/search/movie?api_key=8d4d1ae4d36603cf91dacea6e5205197&language=en-US&query=fight&page=1&include_adult=false";

  // fetch(searchurl)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  // Search query url
  // "https://api.themoviedb.org/3/search/movie?api_key=asdf&language=en-US&query=s&page=1&include_adult=false"

  return (
    // <InputGroup>
    //   <Input
    //     type="text"
    //     placeholder="Search"
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //   />
    //   <InputRightAddon></InputRightAddon>
    // </InputGroup>
    <Icon
      onClick={setIsSearching}
      as={BsSearch}
      color="brand.text.dark"
      cursor="pointer"
    />
  );
};

export default SearchBar;
