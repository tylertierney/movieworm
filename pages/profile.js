// import { useUser } from "../context/authContext";
import { useUser } from "@auth0/nextjs-auth0";

const Profile = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>PROFILE</h1>
      <p>{user?.username}</p>
    </div>
  );
};

export default Profile;

// export async function getStaticProps(context) {
//   return {
//     props: {
//       protected: true,
//     },
//   };
// }
