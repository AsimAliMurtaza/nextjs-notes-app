"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Flex,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Box
      bg={bgColor}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Button onClick={() => router.push("/login")}>Login</Button>
    </Box>
  );
}
