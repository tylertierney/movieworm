import "../styles/globals.css";
import AuthContextProvider from "../context/authContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import theme from "../components/theme";
import { UserProvider } from "@auth0/nextjs-auth0";
import smoothscroll from "smoothscroll-polyfill";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (window) {
      smoothscroll.polyfill();
    }
  }, []);

  return (
    <UserProvider>
      <AuthContextProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthContextProvider>
    </UserProvider>
  );
}

export default MyApp;
