// import { useUser } from "../context/authContext";
import { getAccessToken, useUser } from "@auth0/nextjs-auth0";
import axios from "axios";

import Section from "../components/Section/Section";

const Home = ({ api_key, popularList, genre_list }) => {
  const groupList = [];

  const { user, isLoading, error } = useUser();

  const tokenURL = "https://dev-gexu-wbz.us.auth0.com/oauth/token";
  const headers = { "content-type": "application/json" };

  const getToken = () => {
    axios
      .get("/api/gettoken")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>error</div>;

  return (
    <main>
      <button onClick={() => console.log(user)}>get user</button>
      {/* <button onClick={() => getToken()}>get token</button> */}
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
