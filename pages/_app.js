import "../styles/globals.css";
import AuthContextProvider from "../context/authContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import theme from "../components/theme";
import { UserProvider } from "@auth0/nextjs-auth0";
import smoothscroll from "smoothscroll-polyfill";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (window) {
      smoothscroll.polyfill();
    }
  }, []);

  return (
    <>
      <Head>
        <title>MovieWorm</title>
        <meta name="description" content="Movie reviews for friend groups" />
        <meta property="og:image" content="/full_logo_whiteBG_564x292.png" />
        <meta
          property="og:description"
          content="Movie reviews for friend groups"
        />
        <meta property="og:url" content="https://movieworm.io" />
        <meta property="og:title" content="MovieWorm" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="icon" href="/wormicon-transpBG-16x16.png" />
      </Head>
      <UserProvider>
        <AuthContextProvider>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </AuthContextProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
