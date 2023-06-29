import * as React from "react";
import { useState } from "react";
import * as ReactDOMClient from "react-dom/client";
import {
  Flex,
  ChakraProvider,
  Grid,
  GridItem,
  Button,
  Text
} from "@chakra-ui/react";

function App() {
  const [currentDisplay, setCurrentDisplay] = useState("0");
  const [subDisplay, setSubDisplay] = useState("");
  const [hasDecimal, setHasDecimal] = useState(false);
  const [totalArray, setTotalArray] = useState([]);
  const [calc, setCalc] = useState(false);

  function handleNumberClick(e) {
    if (calc) {
      handleClear();
      setCurrentDisplay("");
      setCalc(false);
    }
    if (e.target.id === "." && !hasDecimal) {
      setHasDecimal(true);
      setCurrentDisplay((prevState) => prevState + e.target.id);
      setSubDisplay((prevState) => prevState + e.target.id);
    } else if ("+-/*".includes(currentDisplay)) {
      setCurrentDisplay(e.target.id);
      setSubDisplay((prevState) => prevState + e.target.id);
    } else if (
      currentDisplay === "0" ||
      (currentDisplay === "0" && e.target.id === "0")
    ) {
      setCurrentDisplay(e.target.id);
      setSubDisplay(e.target.id);
    } else if (e.target.id !== ".") {
      setCurrentDisplay((prevState) => prevState + e.target.id);
      setSubDisplay((prevState) => prevState + e.target.id);
    }
  }

  function handleClear() {
    setCurrentDisplay("0");
    setSubDisplay("");
    setHasDecimal(false);
    setTotalArray([]);
  }

  function handleOperation(e) {
    if (calc) {
      setTotalArray([parseFloat(currentDisplay), e.target.id]);
      setSubDisplay(currentDisplay + e.target.id);
      setHasDecimal(false);
      setCurrentDisplay(e.target.id);
      setCalc(false);
      console.log(totalArray);
    } else {
      if ("-/+*".includes(currentDisplay)) {
        setTotalArray((prevArr) => [...prevArr, e.target.id]);
      } else {
        setTotalArray((prevArr) => [
          ...prevArr,
          parseFloat(currentDisplay),
          e.target.id
        ]);
      }

      setCurrentDisplay(e.target.id);
      setSubDisplay((prevState) => prevState + e.target.id);
      setHasDecimal(false);
      console.log(totalArray);
    }
  }
  function handleCalculate() {
    setCalc(true);
    let tempArray = [...totalArray, parseFloat(currentDisplay)];
    console.log("inital array " + tempArray);
    for (let i = tempArray.length; i >= 0; i--) {
      if (
        i !== tempArray.length &&
        tempArray[i] === "-" &&
        !"+/*".includes(tempArray[i + 1])
      ) {
        tempArray[i] = parseFloat(tempArray[i] + tempArray[i + 1].toString());
        tempArray.splice(i + 1, 1);
      }
      console.log("- conversion: " + tempArray);
    }

    // check multiplication and division
    for (let i = tempArray.length; i >= 0; i--) {
      if (tempArray[i] === "*") {
        tempArray[i - 1] = tempArray[i - 1] * tempArray[i + 1];
        tempArray.splice(i, 2);
      } else if (tempArray[i] === "/") {
        tempArray[i - 1] = tempArray[i - 1] / tempArray[i + 1];
        tempArray.splice(i, 2);
      }
    }

    // check for addition
    for (let i = tempArray.length; i >= 0; i--) {
      if (tempArray[i] === "+") {
        tempArray[i - 1] = tempArray[i - 1] + tempArray[i + 1];
        tempArray.splice(i, 2);
      }
    }
    console.log(tempArray);
    setCurrentDisplay(tempArray[0]);
    setSubDisplay((prevState) => prevState + "=" + tempArray);
  }

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bg="gray.200"
      direction="column">
      <Text
        mb={5}
        fontSize="2xl"
        fontWeight="hairline"
        bgClip="text"
        bgGradient="linear(to-r, pink.500, red.500, blue.500)">
        Javascript Calculator
      </Text>
      <Flex
        bg="gray.400"
        direction="column"
        padding={3}
        rounded="md"
        boxShadow="2xl">
        <Flex
          height={14}
          bg="gray.700"
          width="100%"
          justifyContent="flex-end"
          alignItems="flex-end"
          roundedTop="md"
          padding={1}
          direction="column">
          <Text fontWeight="medium" color="gray.500">
            {subDisplay}
          </Text>
          <Text fontWeight="medium" color="gray.100">
            {currentDisplay}
          </Text>
        </Flex>
        <Grid
          templateColumns="repeat(4, 1fr)"
          templateRows="repeat(5, 1fr)"
          bg="gray.300"
          padding={1}
          rounded="md"
          gap={2}>
          <GridItem colSpan={2}>
            <Button colorScheme="red" width="100%" onClick={handleClear}>
              AC
            </Button>
          </GridItem>
          <GridItem>
            <Button id="/" onClick={handleOperation}>
              /
            </Button>
          </GridItem>
          <GridItem>
            <Button id="*" onClick={handleOperation}>
              x
            </Button>
          </GridItem>
          <GridItem>
            <Button id="7" onClick={handleNumberClick}>
              7
            </Button>
          </GridItem>
          <GridItem>
            <Button id="8" onClick={handleNumberClick}>
              8
            </Button>
          </GridItem>
          <GridItem>
            <Button id="9" onClick={handleNumberClick}>
              9
            </Button>
          </GridItem>
          <GridItem>
            <Button id="-" onClick={handleOperation}>
              -
            </Button>
          </GridItem>
          <GridItem>
            <Button id="4" onClick={handleNumberClick}>
              4
            </Button>
          </GridItem>
          <GridItem>
            <Button id="5" onClick={handleNumberClick}>
              5
            </Button>
          </GridItem>
          <GridItem>
            <Button id="6" onClick={handleNumberClick}>
              6
            </Button>
          </GridItem>
          <GridItem>
            <Button id="+" onClick={handleOperation}>
              +
            </Button>
          </GridItem>
          <GridItem>
            <Button id="1" onClick={handleNumberClick}>
              1
            </Button>
          </GridItem>
          <GridItem>
            <Button id="2" onClick={handleNumberClick}>
              2
            </Button>
          </GridItem>
          <GridItem>
            <Button id="3" onClick={handleNumberClick}>
              3
            </Button>
          </GridItem>
          <GridItem rowSpan={2}>
            <Button height="100%" colorScheme="blue" onClick={handleCalculate}>
              =
            </Button>
          </GridItem>
          <GridItem colSpan={2}>
            <Button id="0" onClick={handleNumberClick} width="100%">
              0
            </Button>
          </GridItem>
          <GridItem>
            <Button id="." onClick={handleNumberClick}>
              .
            </Button>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
