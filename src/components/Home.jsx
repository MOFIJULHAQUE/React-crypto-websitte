import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

import img from "../assets/btc.png";

const Home = () => {
  return (
    <>
      <Box w={"full"} h={"80vh"} bgColor={"blackAlpha.900"}>
        <motion.div
        style={{
          height:"80vh",
        }}
        animate={{
          translateY:"20px",
        }}
        transition={{
          duration:2,
          repeat:Infinity,
          repeatType:"reverse"
        }}
        >
          <Image w={"full"} h={"full"} objectFit={"contain"} src={img} />
        </motion.div>
        {/* <Text
          textAlign={"center"}
          fontSize={"6xl"}
          fontWeight={"thin"}
          color={"whiteAlpha.700"}
          mt={"-120"}
        >
          Crypto
        </Text> */}
      </Box>
    </>
  );
};

export default Home;
