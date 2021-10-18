import { useUser } from "@auth0/nextjs-auth0";

import { useLocalUser } from "../../context/authContext";

import GroupSection from "../GroupSection/GroupSection";

import Section from "../Section/Section";

import { useState, useEffect } from "react";

import axios from "axios";

import LoadingScreen from "../LoadingScreen/LoadingScreen";

import FallbackImg from "../FallbackImg/FallbackImg";

const HomePage = ({ popularList, comedyList, actionList, dramaList }) => {
  const { isLoading, error } = useUser();
  const { localUser } = useLocalUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery != "") {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        )
        .then((res) => setSearchResults(() => res.data.results))
        .catch((err) => console.log(err));
    }
  }, [searchQuery]);

  if (isLoading) return <LoadingScreen status="loading" />;
  if (error) return <LoadingScreen status="error" />;

  let groupSection = null;
  let activeGroup = undefined;

  if (localUser != null && localUser != undefined) {
    if (localUser.activeGroup != null && localUser.activeGroup != undefined) {
      activeGroup = localUser.activeGroup;
      groupSection = <GroupSection group={activeGroup} />;
    }
  }

  let isSearching = false;

  if (localUser != null) {
    if (localUser.isSearching === undefined) {
      isSearching = false;
    }

    if (localUser.isSearching === false) {
      isSearching = false;
    }
    if (localUser.isSearching === true) {
      isSearching = true;
    }
  }

  return (
    <>
      {isSearching && (
        <Section
          title="Search"
          movieList={searchResults}
          group={activeGroup}
          isSearchbar={true}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      {groupSection}
      <Section
        title="Popular"
        movieList={popularList}
        group={activeGroup}
        isSearchbar={false}
      />
      <Section
        title="Comedy"
        movieList={comedyList}
        group={activeGroup}
        isSearchbar={false}
      />
      <Section
        title="Drama"
        movieList={dramaList}
        group={activeGroup}
        isSearchbar={false}
      />
      <Section
        title="Action"
        movieList={actionList}
        group={activeGroup}
        isSearchbar={false}
      />
      <br />
    </>
  );
};

export default HomePage;
