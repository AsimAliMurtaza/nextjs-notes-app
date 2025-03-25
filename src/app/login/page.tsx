"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  Text,
  Divider,
  FormControl,
  FormLabel,
  useToast,
  Container,
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.700");

  const handleLogin = async () => {
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (res?.error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (res?.ok) {
      router.push("/dashboard");
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bg={bgColor}
      bgImage="/bg-pattern.svg"
      bgSize="cover"
      bgPosition="center"
    >
      <Container maxW="sm" px={4}>
        <Box
          bg={cardBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          textAlign="center"
        >
          <Image src="/logo.svg" alt="Journal" mx="auto" h="40px" mb={4} />

          <Heading size="md" fontWeight="semibold" color={textColor}>
            Log in to continue
          </Heading>

          <VStack spacing={4} align="stretch" mt={6}>
            <FormControl id="email" isRequired>
              <FormLabel fontSize="sm" color={textColor}>
                Email
              </FormLabel>
              <Input
                type="email"
                placeholder="you@example.com"
                bg={cardBgColor}
                border="1px solid"
                borderColor={borderColor}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel fontSize="sm" color={textColor}>
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                bg={cardBgColor}
                border="1px solid"
                borderColor={borderColor}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
              />
            </FormControl>

            <Button
              onClick={handleLogin}
              bg={buttonBg}
              _hover={{ bg: buttonHoverBg }}
              color="white"
              w="full"
              size="md"
              isLoading={loading}
            >
              Continue
            </Button>

            <Divider borderColor={borderColor} />

            <Text fontSize="sm" color="blue.500" textAlign="center" mt={4}>
              <Button
                variant="link"
                onClick={() => router.push("/forgot-password")}
              >
                Can&apos;t log in?
              </Button>{" "}
              •{" "}
              <Button variant="link" onClick={() => router.push("/signup")}>
                Create an account
              </Button>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}