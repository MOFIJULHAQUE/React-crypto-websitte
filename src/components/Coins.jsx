import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import ErrorComponent from "./ErrorComponent";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  //for pagination
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  //for multiple pagination
  const paginationBtns = new Array(130).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );

        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error in Fetching coins"} />;
  
  return (
    <>
      <Container maxW={"container.xl"} p={"5"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* //"inr" ? "₹" : currency === "eur" ? "€" : "$" */}
            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"5"} justifyContent={"flex-end"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EURO</Radio>
              </HStack>
            </RadioGroup>

            <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
              {coins.map((item) => (
                <CoinCard
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  price={item.current_price}
                  image={item.image}
                  symbol={item.symbol}
                  currencySymbol={currencySymbol}
                />
              ))}
            </HStack>

            <HStack w={"full"} overflowX={"auto"} p={"8"}>
              {paginationBtns.map((element, index) => (
                <Button
                  key={index}
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </HStack>
          </>
        )}
      </Container>
    </>
  );
};

export default Coins;
