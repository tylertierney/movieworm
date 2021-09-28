import { useUser } from "../context/authContext";

import { useState } from "react";
import BrandedHeading from "../components/BrandedHeading";
import HorizontalList from "../components/HorizontalList";
import Description from "../components/Description";

const Home = ({ api_key, movieList, genre_list }) => {
  // const { user, setUser, login, logout } = useUser();

  const [descriptionShowing, setDescriptionShowing] = useState(false);
  const [descriptionDetails, setDescriptionDetails] = useState({});

  console.log(genre_list);

  return (
    <main>
      <HorizontalList
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
      />
      {descriptionShowing && (
        <Description
          setDescriptionShowing={setDescriptionShowing}
          movieDetails={descriptionDetails}
        />
      )}
      <HorizontalList
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
      />
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const api_key = process.env.API_KEY;
  let movieList, genre_list;
  const popular_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  await fetch(popular_url)
    .then((res) => res.json())
    .then((data) => (movieList = data.results))
    .catch((err) => console.log(err));

  const genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

  await fetch(genres_url)
    .then((res) => res.json())
    .then((data) => (genre_list = data))
    // .then((data) => )
    .catch((err) => console.log(err));

  return {
    props: { movieList, genre_list },
  };
}
