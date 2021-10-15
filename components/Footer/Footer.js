import { Flex, List, ListItem, Icon, Box } from "@chakra-ui/react";
import Logo from "../Logo/Logo";
import Link from "next/link";

import { FaFacebook, FaPinterest } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { AiOutlineTwitter } from "react-icons/ai";

const listItemsArray = [
  { text: "About Us", link: "/" },
  { text: "Contact", link: "/" },
  { text: "Careers", link: "/" },
  { text: "News", link: "/" },
];

const Footer = () => {
  return (
    <footer style={{ width: "100vw", height: "200px", minHeight: "200px" }}>
      <Flex
        w="100%"
        h="100%"
        backgroundColor="brand.gray"
        paddingX={["0.3rem", "2rem"]}
        align="center"
        justify="space-around"
      >
        <Flex h="90%" justify="center" align="center">
          <Box
            width={["100px", "140px", "180px", "220px"]}
            cursor="pointer"
            onClick={() => router.push("/")}
          >
            <Logo />
          </Box>
        </Flex>
        <List
          fontSize="inherit"
          color="inherit"
          spacing={[4, 4, 0]}
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent={["center", "center", "center"]}
        >
          {listItemsArray.map((item, index) => {
            return (
              <ListItem
                key={index}
                m="0rem 0.7rem"
                opacity="0.5"
                transition="0.3s ease-in-out"
                _hover={{ opacity: "1" }}
              >
                <Link href={item.link}>{item.text}</Link>
              </ListItem>
            );
          })}
        </List>
        <Flex align="center" fontSize="1.4rem" justify="space-around">
          <Link href="/" passHref>
            <a>
              <Icon
                transition="0.3s ease-in-out"
                opacity="0.5"
                _hover={{ opacity: "1" }}
                cursor="pointer"
                mr="0.6rem"
                as={FaFacebook}
              />
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <Icon
                as={FaPinterest}
                transition="0.3s ease-in-out"
                opacity="0.5"
                _hover={{ opacity: "1" }}
                cursor="pointer"
                mr="0.6rem"
              />
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <Icon
                as={RiLinkedinFill}
                transition="0.3s ease-in-out"
                opacity="0.5"
                _hover={{ opacity: "1" }}
                cursor="pointer"
                mr="0.6rem"
              />
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <Icon
                as={AiOutlineTwitter}
                transition="0.3s ease-in-out"
                opacity="0.5"
                _hover={{ opacity: "1" }}
                cursor="pointer"
                mr="0.6rem"
              />
            </a>
          </Link>
        </Flex>
      </Flex>
    </footer>
  );
};

export default Footer;
