"use client";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Text,
  HStack,
  useColorModeValue,
  Flex,
  Divider,
  SimpleGrid,
  Spinner,
  useToast,
  IconButton,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiPlus,
  BiPin,
  BiTrash,
  BiEdit,
  BiGrid,
  BiListOl as BiList,
} from "react-icons/bi";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

interface ExtendedSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // State for view mode
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("green.500", "green.600");
  const buttonHoverBg = useColorModeValue("green.600", "green.700");
  const cardHoverBg = useColorModeValue("gray.100", "gray.700");
  const [isHovered, setIsHovered] = useState(false);

  const { data: session } = useSession() as {
    data: ExtendedSession | null;
  };

  const userID = session?.user?.id;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/get-notes?userID=${userID}`);
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

    if (userID) {
      fetchNotes();
    }
  }, [userID, toast]);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh" bg={bgColor}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  const stripHtml = (text: string) => {
    return text
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

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
    <Box bg={bgColor} p={8} minH="100vh">
      <Box maxW="1200px" mx="auto">
        <Flex justify="space-between" align="center" mb={8}>
          <HStack spacing={4}>
            <IconButton
              aria-label="Grid View"
              icon={<BiGrid />}
              onClick={() => setViewMode("grid")}
              colorScheme={viewMode === "grid" ? "green" : "gray"}
              borderRadius="full"
            />
            <IconButton
              aria-label="List View"
              icon={<BiList />}
              onClick={() => setViewMode("list")}
              colorScheme={viewMode === "list" ? "green" : "gray"}
              borderRadius="full"
            />
          </HStack>
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition="all 0.3s ease-in-out" // Smooth transition for the entire box
          >
            <IconButton
              color="white"
              bg={buttonBg}
              _hover={{ bg: buttonHoverBg, shadow: "lg" }}
              onClick={() => router.push("/dashboard/create")}
              borderRadius="full"
              icon={!isHovered ? <BiPlus /> : undefined} // Show icon when not hovered
              shadow={"xl"}
              aria-label={"add-note"}
              padding={isHovered ? "8px 20px" : "12px"} // Adjust padding for text
              transition="padding 0.1s ease-in-out" // Smooth padding transition
            >
              {isHovered && (
                <Text
                  whiteSpace="nowrap"
                  transition="opacity 0.3s ease-in-out"
                  opacity={isHovered ? 1 : 0} // Fade in/out text
                >
                  New Note
                </Text>
              )}
            </IconButton>
          </Box>
        </Flex>

        <Text fontSize="sm" fontWeight="thin" color={textColor} mb={4}>
          PINNED
        </Text>
        {viewMode === "grid" ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
            {notes
              .filter((note) => note.pinned)
              .map((note) => (
                <Card
                  key={note._id}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{
                    bg: cardHoverBg,
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                >
                  <CardHeader
                    fontWeight="semibold"
                    fontSize="lg"
                    color={textColor}
                  >
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
                    <HStack mt={4} justifyContent="space-between">
                      <HStack>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme="green"
                          icon={<BiEdit />}
                          onClick={() =>
                            router.push(`/dashboard/edit/${note._id}`)
                          }
                          aria-label="View/Edit"
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme={note.pinned ? "yellow" : "gray"}
                          icon={<BiPin />}
                          onClick={() => handlePinNote(note._id, !note.pinned)}
                          aria-label={note.pinned ? "Unpin" : "Pin"}
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme="red"
                          icon={<BiTrash />}
                          onClick={() => handleDeleteNote(note._id)}
                          aria-label="Delete"
                        />
                      </HStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
          </SimpleGrid>
        ) : (
          <List spacing={4} mb={8}>
            {notes
              .filter((note) => note.pinned)
              .map((note) => (
                <ListItem
                  key={note._id}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={borderColor}
                  p={4}
                  transition="all 0.2s"
                  _hover={{
                    bg: cardHoverBg,
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                >
                  <Text fontWeight="semibold" fontSize="lg" color={textColor}>
                    {note.title}
                  </Text>
                  <Text color={textColor} noOfLines={2} mt={2}>
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
                  <HStack mt={4} justifyContent="space-between">
                    <HStack>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme="green"
                        icon={<BiEdit />}
                        onClick={() =>
                          router.push(`/dashboard/edit/${note._id}`)
                        }
                        aria-label="View/Edit"
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme={note.pinned ? "yellow" : "gray"}
                        icon={<BiPin />}
                        onClick={() => handlePinNote(note._id, !note.pinned)}
                        aria-label={note.pinned ? "Unpin" : "Pin"}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme="red"
                        icon={<BiTrash />}
                        onClick={() => handleDeleteNote(note._id)}
                        aria-label="Delete"
                      />
                    </HStack>
                  </HStack>
                </ListItem>
              ))}
          </List>
        )}

        <Text fontSize="sm" fontWeight="thin" color={textColor} mb={4}>
          OTHERS
        </Text>
        {viewMode === "grid" ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
            {notes
              .filter((note) => !note.pinned)
              .map((note) => (
                <Card
                  key={note._id}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={borderColor}
                  transition="all 0.2s"
                  _hover={{
                    bg: cardHoverBg,
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                >
                  <CardHeader
                    fontWeight="semibold"
                    fontSize="lg"
                    color={textColor}
                  >
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
                    <HStack mt={4} justifyContent="space-between">
                      <HStack>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme="green"
                          icon={<BiEdit />}
                          onClick={() =>
                            router.push(`/dashboard/edit/${note._id}`)
                          }
                          aria-label="View/Edit"
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme={note.pinned ? "yellow" : "gray"}
                          icon={<BiPin />}
                          onClick={() => handlePinNote(note._id, !note.pinned)}
                          aria-label={note.pinned ? "Unpin" : "Pin"}
                        />
                        <IconButton
                          size="sm"
                          variant="ghost"
                          borderRadius="full"
                          colorScheme="red"
                          icon={<BiTrash />}
                          onClick={() => handleDeleteNote(note._id)}
                          aria-label="Delete"
                        />
                      </HStack>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
          </SimpleGrid>
        ) : (
          <List spacing={4} mb={8}>
            {notes
              .filter((note) => !note.pinned)
              .map((note) => (
                <ListItem
                  key={note._id}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  border="1px solid"
                  borderColor={borderColor}
                  p={4}
                  transition="all 0.2s"
                  _hover={{
                    bg: cardHoverBg,
                    transform: "scale(1.02)",
                    boxShadow: "lg",
                  }}
                >
                  <Text fontWeight="semibold" fontSize="lg" color={textColor}>
                    {note.title}
                  </Text>
                  <Text color={textColor} noOfLines={2} mt={2}>
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
                  <HStack mt={4} justifyContent="space-between">
                    <HStack>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme="green"
                        icon={<BiEdit />}
                        onClick={() =>
                          router.push(`/dashboard/edit/${note._id}`)
                        }
                        aria-label="View/Edit"
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme={note.pinned ? "yellow" : "gray"}
                        icon={<BiPin />}
                        onClick={() => handlePinNote(note._id, !note.pinned)}
                        aria-label={note.pinned ? "Unpin" : "Pin"}
                      />
                      <IconButton
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        colorScheme="red"
                        icon={<BiTrash />}
                        onClick={() => handleDeleteNote(note._id)}
                        aria-label="Delete"
                      />
                    </HStack>
                  </HStack>
                </ListItem>
              ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
