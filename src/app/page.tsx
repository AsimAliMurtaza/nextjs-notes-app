"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.700");

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        {/* Heading */}
        <Heading
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="bold"
          color={textColor}
        >
          Welcome to Notes App
        </Heading>

        {/* Subheading */}
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          color={textColor}
          maxW="2xl"
        >
          A simple and powerful tool to manage your tasks, notes, and more. Get
          started today and take control of your productivity.
        </Text>

        {/* Call-to-Action Button */}
        <Button
          size="lg"
          color="white"
          bg={buttonBg}
          _hover={{ bg: buttonHoverBg }}
          onClick={() => router.push("/login")}
        >
          Get Started
        </Button>
      </VStack>
    </Flex>
  );
}