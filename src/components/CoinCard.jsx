import React from "react";
import { Heading, Image, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CoinCard = ({ id, name, image, symbol, price, currencySymbol = "₹" }) => {
  return (
    <>
      <Link to={`/coin/${id}`} >
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
          <Heading size={"md"} noOfLines={"1"} textTransform={"uppercase"}>
            {symbol}
          </Heading>
          <Text noOfLines={"1"}>{name}</Text>
          <Text noOfLines={"1"}>
            {price ? `${currencySymbol}${price}` : "NA"}
          </Text>
        </VStack>
      </Link>
    </>
  );
};

export default CoinCard;
