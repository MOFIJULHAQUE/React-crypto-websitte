import React from "react";
import { Heading, Image, VStack, Text } from "@chakra-ui/react";
const ExchangeCard = ({ rank, name, image, url }) => {
  return (
    <>
      <a href={url} target={"blank"}>
        <VStack
          w={"52"}
          shadow={"lg"}
          m={"3"}
          p={"8"}
          borderRadius={"lg"}
          transition={"all 0.3s"}
          css={{
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <Image src={image} alt={name} />
          <Heading size={"md"} noOfLines={"1"}>
            {rank}
          </Heading>
          <Text noOfLines={"1"}>{name}</Text>
        </VStack>
      </a>
    </>
  );
};

export default ExchangeCard;
