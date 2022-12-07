import React from "react";
import { Button, HStack } from "@chakra-ui/react";
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <>
      <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.800"} color={"white"}>
        <Button  variant={"unstyled"}  >
            <Link to="/"  >Home</Link>
        </Button>

        <Button  variant={"unstyled"}  >
            <Link to="/exchanges"  >Exchanges</Link>
        </Button>

        <Button  variant={"unstyled"}  >
            <Link to="/coins"  >Coins</Link>
        </Button>
      </HStack>
    </>
  );
};

export default Header;
