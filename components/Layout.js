import Navbar from "./Navbar/Navbar";
import { useUser } from "@auth0/nextjs-auth0";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer/Footer";

const Layout = ({ children }) => {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      <main>
        <Box maxW="100vw" mt="7vh" paddingX={["0", "0", "0", "0"]}>
          {children}
        </Box>
      </main>

      <Footer />
    </>
  );
};

export default Layout;
