import { Box, Spinner, VStack } from "@chakra-ui/react";
import React from "react";

// import "../styles/loader.css"

const Loader = () => {
  return (
    <>
      {/* <div className="loader">
      <div></div>
    </div> */}
      <VStack justifyContent={"center"} h={"90vh"}>
        <Box transform={"scale(3)"}>
          <Spinner size={"xl"} />
        </Box>
      </VStack>
    </>
  );
};

export default Loader;
