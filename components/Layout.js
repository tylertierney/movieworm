import Navbar from "./Navbar/Navbar";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  const { user } = useUser();

  return (
    <>
      <Head>
        <title>MovieWorm</title>
        <meta name="description" content="Private movie reviews for friends" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/wormIconPNG.png" />
      </Head>

      <Navbar />
      <main style={{ width: "100vw" }}>
        <Box
          maxW="100vw"
          mt="7vh"
          minH="100vh"
          // h="93vh"
          // maxH="93vh"
          paddingX={["0", "0", "0", "0"]}
        >
          {children}
        </Box>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
