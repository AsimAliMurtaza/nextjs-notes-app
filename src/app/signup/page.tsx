"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Divider,
  useToast,
  Container,
  Flex,
  useColorMode,
  useColorModeValue,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const boxColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const inputBgColor = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.700");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSignup = async () => {
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      toast({
        title: "Account created!",
        description: "You can now log in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/login");
    } else {
      setError("Signup failed! Try again.");
    }
  };

  return (
    <Flex justify="center" align="center" minH="100vh" bg={bgColor} p={4}>
      <Container maxW="sm">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            bg={boxColor}
            p={8}
            borderRadius="lg"
            boxShadow="lg"
            textAlign="center"
          >
            <Image src="/logo.svg" alt="Journal" mx="auto" h="40px" mb={4} />

            <IconButton
              aria-label="Toggle dark mode"
              icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
              variant="ghost"
              position="absolute"
              top={4}
              right={4}
            />

            <Heading size="md" fontWeight="semibold" color={textColor}>
              Create your account
            </Heading>

            <VStack spacing={4} align="stretch" mt={6}>
              {error && (
                <Text color="red.500" fontSize="sm" textAlign="center">
                  {error}
                </Text>
              )}

              <FormControl id="email" isRequired>
                <FormLabel fontSize="sm" color={textColor}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  bg={inputBgColor}
                  border="1px solid"
                  borderColor="gray.300"
                  onChange={handleInputChange}
                  name="email"
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
                  bg={inputBgColor}
                  border="1px solid"
                  borderColor="gray.300"
                  onChange={handleInputChange}
                  name="password"
                  _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
                />
              </FormControl>

              <Button
                onClick={handleSignup}
                bg={buttonBg}
                color="white"
                _hover={{ bg: buttonHoverBg }}
                isLoading={loading}
                w="full"
              >
                Sign Up
              </Button>

              <Divider />

              <Text fontSize="sm" color={textColor} textAlign="center">
                Already have an account?{" "}
                <Button
                  variant="link"
                  color="blue.500"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </Button>
              </Text>
            </VStack>
          </Box>
        </motion.div>
      </Container>
    </Flex>
  );
}