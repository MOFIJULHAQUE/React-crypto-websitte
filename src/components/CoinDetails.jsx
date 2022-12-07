import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Container,
  HStack,
  Image,
  Radio,
  RadioGroup,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { server } from "../index.js";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");

  //for chart
  const [days, setDays] = useState("24h");
  const [chartArr, setChartArr] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24H", "7D", "14D", "30D", "60D", "200D", "1Y", "max"];
  const switchChartStates = (key) => {
    switch (key) {
      case "24H":
        setDays("24h");
        setLoading(true);
        break;
      case "7D":
        setDays("7d");
        setLoading(true);
        break;

      case "14D":
        setDays("14d");
        setLoading(true);
        break;

      case "30D":
        setDays("30d");
        setLoading(true);
        break;

      case "60D":
        setDays("60d");
        setLoading(true);
        break;

      case "200D":
        setDays("20d");
        setLoading(true);
        break;

      case "1Y":
        setDays("365d");
        setLoading(true);
        break;

      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log(chartData.prices);

        setCoin(data);
        setChartArr(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message={"Error in Fetching coin"} />;

  return (
    <>
      <Container maxW={"container.xl"}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Box w={"full"} borderWidth={"1"}>
              <Chart arr={chartArr} currency={currencySymbol} days={days} />
            </Box>

            {/*  */}
            {btns.map((i) => (
              <Button
                bgColor={"whatsapp.100"}
                m={"2"}
                key={i}
                onClick={() => switchChartStates(i)}
              >
                {i}
              </Button>
            ))}

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"5"} justifyContent={"flex-end"}>
                <Radio value={"inr"}>INR</Radio>
                <Radio value={"usd"}>USD</Radio>
                <Radio value={"eur"}>EURO</Radio>
              </HStack>
            </RadioGroup>

            <VStack p={"16"} spacing={"4"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf="center" opacity={"0.7"}>
                Last Updated on{" "}
                {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>
              <Image
                src={coin.image.large}
                h={"16"}
                w={"16"}
                objectFit={"contain"}
              />

              <Stat>
                <StatLabel>{coin.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coin.market_data.price_change_percentage_24h > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coin.market_data.price_change_percentage_24h} %
                </StatHelpText>
              </Stat>

              <Badge
                fontSize={"2xl"}
                bgColor={"whatsapp.100"}
              >{`#${coin.market_cap_rank}`}</Badge>

              <Custombar
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              />

              <Box w={"full"} p={"4"}>
                <Item title={"Max Suply"} value={coin.market_data.max_supply} />

                <Item
                  title={"Circulating Supply"}
                  value={coin.market_data.circulating_supply}
                />

                <Item
                  title={"Market Cap"}
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />

                <Item
                  title={"All Time Low"}
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />

                <Item
                  title={"All Time High"}
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
    </>
  );
};

// custombar
const Custombar = ({ high, low }) => {
  return (
    <>
      <VStack w={"full"}>
        <Progress value={"90"} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} colorScheme={"red"} />
          <Text fontSize={"sm"}>24H Range</Text>
          <Badge children={high} colorScheme={"green"} />
        </HStack>
      </VStack>
    </>
  );
};

//item
const Item = ({ title, value }) => {
  return (
    <>
      <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text letterSpacing={"widest"} fontFamily={"bebas Neue"}>
          {title}
        </Text>
        <Text fontFamily={"bebas Neue"}>{value}</Text>
      </HStack>
    </>
  );
};

export default CoinDetails;
