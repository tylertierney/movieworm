import { useUser } from "@auth0/nextjs-auth0";

import { useLocalUser } from "../context/authContext";

import GroupSection from "../components/GroupSection/GroupSection";

import Section from "../components/Section/Section";

import { useState, useEffect } from "react";

import axios from "axios";

const Home = ({ popularList, genre_list, comedyList }) => {
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

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

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
    <main>
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
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const api_key = process.env.API_KEY;
  let popularList, genre_list, comedyList;

  popularList = [];
  genre_list = [];
  comedyList = [];

  const popular_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const comedy_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`;
  await fetch(popular_url)
    .then((res) => res.json())
    .then((data) => (popularList = data.results))
    .catch((err) => console.log(err));

  await fetch(comedy_url)
    .then((res) => res.json())
    .then((data) => (comedyList = data.results))
    .catch((err) => console.log(err));

  // const genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

  // await fetch(genres_url)
  //   .then((res) => res.json())
  //   .then((data) => (genre_list = data))
  //   .catch((err) => console.log(err));

  return {
    props: { popularList, genre_list, comedyList },
  };
}
