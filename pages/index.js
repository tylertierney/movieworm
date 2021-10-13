import { useUser } from "@auth0/nextjs-auth0";

import { useLocalUser } from "../context/authContext";

import GroupSection from "../components/GroupSection/GroupSection";

import Section from "../components/Section/Section";

const Home = ({ popularList, genre_list, comedyList }) => {
  const { user, isLoading, error } = useUser();
  const { localUser } = useLocalUser();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  let groupSection;
  if (localUser == null) {
    groupSection = null;
  } else {
    localUser.groups.forEach((group) => {
      if (group.isActive) {
        const groupList = [];

        const groupList1 = group.reviews.map((review) => {
          return review.movieDetails;
        });
        groupSection = (
          <GroupSection
            title={group.name}
            // movieList={groupList1}
            group={group}
          />
        );
      }
    });
  }

  return (
    <main>
      {/* <button onClick={() => console.log(localUser)}>group user</button>
      <br />
      <button onClick={() => console.log(user)}>user</button> */}
      {groupSection}
      <Section title="Popular" movieList={popularList} />
      <Section title="Comedy" movieList={comedyList} />
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
