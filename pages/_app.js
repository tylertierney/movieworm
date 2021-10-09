import "../styles/globals.css";
import AuthContextProvider from "../context/authContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../components/Layout";
import theme from "../components/theme";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }) {
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
