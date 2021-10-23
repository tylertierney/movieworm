import { Flex } from "@chakra-ui/react";

import Image from "next/image";

import MobileScreenshot1 from "../public/images/mobile-screenshot1.png";
import MobileScreenshot2 from "../public/images/mobile-screenshot2.png";
import MobileScreenshot3 from "../public/images/mobile-screenshot3.png";

const MobileScreenshots = () => {
  return (
    <Flex justify="space-around" align="center" w="100%">
      <Flex
        w="30%"
        className="screenshots"
        mt="8%"
        // something
      >
        <Image
          alt="App screenshot"
          src={MobileScreenshot1}
          className="screenshots borderRadius"
        />
      </Flex>
      <Flex
        w="30%"
        className="screenshots"
        mt="4%"
        //something
      >
        <Image
          alt="App screenshot"
          src={MobileScreenshot2}
          className="screenshots borderRadius"
        />
      </Flex>
      <Flex
        w="30%"
        className="screenshots"
        //some
      >
        <Image
          alt="App screenshot"
          src={MobileScreenshot3}
          className="screenshots borderRadius"
        />
      </Flex>
    </Flex>
  );
};

export default MobileScreenshots;
