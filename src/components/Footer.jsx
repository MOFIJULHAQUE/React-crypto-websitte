import { Avatar, Box, Stack, VStack, Text } from "@chakra-ui/react";
import React from "react";
import Haque from "../assets/haque.jpg"

const Footer = () => {
  return (
    <>
      <Box
        bgColor={"blackAlpha.900"}
        color={"whiteAlpha.700"}
        minH={"48"}
        px={"16"}
        py={["16", "8"]}
      >
        <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
          <VStack w={"full"} alignItems={["center", "flex-start"]}>
            <Text fontWeight={"bold"}>About us</Text>
            <Text
              fontSize={"sm"}
              letterSpacing={"widest"}
              textAlign={["center", "left"]}
            >
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
              voluptatum et, nulla adipisci quis culpa harum qui autem maxime
              sequi.
            </Text>
          </VStack>

          <VStack>
            <Avatar boxSize={"28"} mt={["4", "0"]} />
           
            <Text fontWeight={"bold"} le>Mofijul Haque</Text>
          </VStack>
        </Stack>
      </Box>
    </>
  );
};

export default Footer;
