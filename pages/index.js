import { useUser } from "../context/authContext";

import { useState, useEffect, useRef } from "react";
// import BrandedHeading from "../components/BrandedHeading";
// import HorizontalList from "../components/HorizontalList";
// import Description from "../components/Description";
// import { Box } from "@chakra-ui/react";

import Section from "../components/Section/Section";

const Home = ({ api_key, popularList, genre_list }) => {
  const groupList = [];

  return (
    <main>
      <Section title="Your Group" movieList={groupList} />
      <Section title="Popular" movieList={popularList} />
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const api_key = process.env.API_KEY;
  let popularList, genre_list;
  const popular_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  await fetch(popular_url)
    .then((res) => res.json())
    .then((data) => (popularList = data.results))
    .catch((err) => console.log(err));

  const genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

  await fetch(genres_url)
    .then((res) => res.json())
    .then((data) => (genre_list = data))
    .catch((err) => console.log(err));

  return {
    props: { popularList, genre_list },
  };
}
