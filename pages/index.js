import { useUser } from "../context/authContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import BrandedHeading from "../components/BrandedHeading";
import HorizontalList from "../components/HorizontalList";
import Description from "../components/Description";

const Home = () => {
  const { user, setUser, login, logout } = useUser();

  const [descriptionShowing, setDescriptionShowing] = useState(false);
  const [descriptionDetails, setDescriptionDetails] = useState({});

  const [movieList, setMovieList] = useState(null);

  const getMovies = async () => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=8d4d1ae4d36603cf91dacea6e5205197&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    await fetch(url)
      .then((res) => res.json())
      .then((data) => setMovieList(() => data.results))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  // const searchurl =
  //   "https://api.themoviedb.org/3/search/movie?api_key=8d4d1ae4d36603cf91dacea6e5205197&language=en-US&query=fight&page=1&include_adult=false";

  // fetch(searchurl)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  return (
    <main>
      <HorizontalList
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
      />
      {descriptionShowing && <Description movieDetails={descriptionDetails} />}
      <HorizontalList
        setDescriptionDetails={setDescriptionDetails}
        movieList={movieList}
        setDescriptionShowing={setDescriptionShowing}
      />
    </main>
  );
};

export default Home;
