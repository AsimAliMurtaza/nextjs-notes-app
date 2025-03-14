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
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("black", "blue.500");
  const buttonHoverBg = useColorModeValue("gray.800", "blue.600");

  return (
    <Box
      bg={bgColor}
      p={8}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Box flex="1" maxW="1200px">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Recent Entries
          </Text>
          <Button
            color="white"
            bg={buttonBg}
            _hover={{
              bg: buttonHoverBg,
              shadow: "md",
            }}
            onClick={() => router.push("/dashboard/create")}
            borderRadius="full"
            leftIcon={<Icon as={PlusIcon} />}
          >
            New Entry
          </Button>
        </Flex>

        {/* Stats Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          mb={8}
        >
          <Card
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Total Notes Created
            </CardHeader>
            <CardBody>
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                42
              </Text>
            </CardBody>
          </Card>
          <Card
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Pinned Notes
            </CardHeader>
            <CardBody>
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                5
              </Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Pinned Notes Section */}
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          Pinned Notes
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={8}>
          <Card
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", shadow: "xl" }}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Pinned Entry 1
            </CardHeader>
            <CardBody>
              <Text color={textColor}>
                This is a pinned entry. It could contain important notes or
                reminders.
              </Text>
              <Divider my={4} borderColor={borderColor} />
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Created: 2023-10-01
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Last Updated: 2023-10-02
                </Text>
              </HStack>
            </CardBody>
          </Card>
          <Card
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", shadow: "xl" }}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Pinned Entry 2
            </CardHeader>
            <CardBody>
              <Text color={textColor}>
                Another pinned entry with some more details.
              </Text>
              <Divider my={4} borderColor={borderColor} />
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Created: 2023-10-03
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Last Updated: 2023-10-04
                </Text>
              </HStack>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* All Notes Section */}
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          All Notes
        </Text>
        <VStack spacing={6} w="100%">
          <Card
            w="100%"
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", shadow: "xl" }}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Entry 1
            </CardHeader>
            <CardBody>
              <Text color={textColor}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                cum officiis reprehenderit quae numquam. Vero vitae quia
                nesciunt sit suscipit temporibus similique dolores? Asperiores,
                error. Praesentium ex minus id consequuntur.
              </Text>
              <Divider my={4} borderColor={borderColor} />
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Created: 2023-10-01
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Last Updated: 2023-10-02
                </Text>
              </HStack>
            </CardBody>
          </Card>
          <Card
            w="100%"
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
            border="1px solid"
            borderColor={borderColor}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.02)", shadow: "xl" }}
          >
            <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
              Entry 2
            </CardHeader>
            <CardBody>
              <Text color={textColor}>
                Another journal entry with some more details. This could include
                thoughts, reflections, or anything else you want to document.
              </Text>
              <Divider my={4} borderColor={borderColor} />
              <HStack spacing={4}>
                <Text fontSize="sm" color="gray.500">
                  Created: 2023-10-03
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Last Updated: 2023-10-04
                </Text>
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </Box>
  );
}
