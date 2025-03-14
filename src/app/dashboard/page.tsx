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
  SimpleGrid,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  interface Note {
    _id: string;
    title: string;
    content: string;
    pinned: boolean;
    createdAt: string;
    updatedAt: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("blue.500", "blue.600");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.700");

  // Fetch all notes from the backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/get-notes");
        if (response.ok) {
          const data = await response.json();
          setNotes(data.notes);
        } else {
          throw new Error("Failed to fetch notes");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast({
          title: "Error",
          description: "Failed to fetch notes. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const stripHtml = (text: string) => {
    return text
      .replace(/<[^>]+>/g, "") // Remove all HTML tags
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim(); // Trim leading and trailing spaces
  };
  // Function to handle note deletion
  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/delete-note`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId }),
      });

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
        toast({
          title: "Note Deleted",
          description: "The note has been deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function to handle pinning/unpinning notes
  const handlePinNote = async (noteId: string, pinned: boolean) => {
    try {
      const response = await fetch(`/api/pin-notes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId, pinned }),
      });

      if (response.ok) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteId ? { ...note, pinned } : note
          )
        );
      } else {
        throw new Error("Failed to update pin status");
      }
    } catch (error) {
      console.error("Error pinning/unpinning note:", error);
      toast({
        title: "Error",
        description: "Failed to update pin status. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={bgColor} p={8}>
      <Box maxW="1200px" mx="auto">
        {/* Header Section */}
        <Flex justify="space-between" align="center" mb={8}>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            Recent Entries
          </Text>
          <Button
            color="white"
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg, shadow: "md" }}
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
                {notes.length}
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
                {notes.filter((note) => note.pinned).length}
              </Text>
            </CardBody>
          </Card>
        </Grid>

        {/* Pinned Notes Section */}
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          Pinned Notes
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {notes
            .filter((note) => note.pinned)
            .map((note) => (
              <Card
                key={note._id}
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={borderColor}
                transition="all 0.2s"
                _hover={{ transform: "scale(1.02)", shadow: "xl" }}
              >
                <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
                  {note.title}
                </CardHeader>
                <CardBody>
                  <Text color={textColor} noOfLines={4}>
                    {stripHtml(note.content)}
                  </Text>
                  <Divider my={4} borderColor={borderColor} />
                  <HStack spacing={4}>
                    <Text fontSize="sm" color="gray.500">
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Last Updated:{" "}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <HStack mt={4}>
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      colorScheme="green"
                      onClick={() => router.push(`/dashboard/edit/${note._id}`)}
                    >
                      View/Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      colorScheme={note.pinned ? "yellow" : "gray"}
                      onClick={() => handlePinNote(note._id, !note.pinned)}
                    >
                      {note.pinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      colorScheme="red"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
        </SimpleGrid>

        {/* All Notes Section */}
        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          All Notes
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
          {notes
            .filter((note) => !note.pinned)
            .map((note) => (
              <Card
                key={note._id}
                bg={cardBg}
                borderRadius="2xl"
                boxShadow="lg"
                border="1px solid"
                borderColor={borderColor}
                transition="all 0.2s"
                _hover={{ transform: "scale(1.02)", shadow: "xl" }}
              >
                <CardHeader fontWeight="bold" fontSize="lg" color={textColor}>
                  {note.title}
                </CardHeader>
                <CardBody>
                  <Text color={textColor} noOfLines={4}>
                    {stripHtml(note.content)}
                  </Text>
                  <Divider my={4} borderColor={borderColor} />
                  <HStack spacing={4}>
                    <Text fontSize="sm" color="gray.500">
                      Created: {new Date(note.createdAt).toLocaleDateString()}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Last Updated:{" "}
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                  <HStack mt={4}>
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      colorScheme="green"
                      onClick={() => router.push(`/dashboard/edit/${note._id}`)}
                    >
                      View/Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      colorScheme={note.pinned ? "yellow" : "gray"}
                      onClick={() => handlePinNote(note._id, !note.pinned)}
                    >
                      {note.pinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      borderRadius="full"
                      onClick={() => handleDeleteNote(note._id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
