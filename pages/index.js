import HomePage from "../components/HomePage/HomePage";

const Home = ({
  popularList,
  genre_list,
  comedyList,
  actionList,
  dramaList,
}) => {
  return (
    <main>
      <HomePage
        popularList={popularList}
        comedyList={comedyList}
        actionList={actionList}
        dramaList={dramaList}
      />
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  const api_key = process.env.API_KEY;
  let popularList = [],
    genre_list = [],
    comedyList = [],
    actionList = [],
    dramaList = [];

  const popular_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const comedy_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=35`;
  const action_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28`;
  const drama_url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=18`;

  await fetch(popular_url)
    .then((res) => res.json())
    .then((data) => (popularList = data.results))
    .catch((err) => console.log(err));

  await fetch(comedy_url)
    .then((res) => res.json())
    .then((data) => (comedyList = data.results))
    .catch((err) => console.log(err));

  const genres_url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

  await fetch(genres_url)
    .then((res) => res.json())
    .then((data) => (genre_list = data))
    .catch((err) => console.log(err));

  await fetch(action_url)
    .then((res) => res.json())
    .then((data) => (actionList = data.results))
    .catch((err) => console.log(err));

  await fetch(drama_url)
    .then((res) => res.json())
    .then((data) => (dramaList = data.results))
    .catch((err) => console.log(err));

  return {
    props: { popularList, genre_list, comedyList, actionList, dramaList },
  };
}
