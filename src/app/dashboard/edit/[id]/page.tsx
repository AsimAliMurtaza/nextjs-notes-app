"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Input,
  Text,
  Flex,
  useColorModeValue,
  Icon,
  VStack,
  useToast,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { SaveIcon, ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function EditNote({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("green.500", "green.600");
  const buttonHoverBg = useColorModeValue("green.600", "green.700");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/get-note?id=${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.note.title);
          setContent(data.note.content);
        } else {
          throw new Error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error fetching note:", error);
        toast({
          title: "Error",
          description: "Failed to fetch note. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [params.id]);

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/update-note`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id, title, content }),
      });

      if (response.ok) {
        toast({
          title: "Note Updated",
          description: "Your note has been updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/dashboard");
      } else {
        throw new Error("Failed to update note");
      }
    } catch (error) {
      console.error("Error updating note:", error);
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="flex-start" minH="100vh" bg={bgColor} p={4}>
      <Card w="full" maxW="800px" bg={cardBg} boxShadow="md" borderRadius="lg" borderColor={borderColor}>
        <CardHeader display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold" color={textColor}>
            Edit Note
          </Text>
          <Button
            leftIcon={<Icon as={ArrowLeftIcon} />}
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            size="sm"
          >
            Back
          </Button>
        </CardHeader>
        <Divider borderColor={borderColor} />
        <CardBody>
          <FormControl mb={4}>
            <VStack spacing={6} align="start">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                borderRadius="md"
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500", boxShadow: "sm" }}
                fontSize="md"
                fontWeight="medium"
              />
              <Box
                w="full"
                h="300px"
                overflow="auto"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                bg={useColorModeValue("white", "gray.700")}
              >
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
                  placeholder="Start typing your content..."
                  style={{ height: "100%", borderRadius: "8px", border: "none" }}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, 3, false] }],
                      ["bold", "italic", "underline", "strike"],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                />
              </Box>
              <Button
                colorScheme="green"
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                leftIcon={<Icon as={SaveIcon} />}
                onClick={handleSave}
                borderRadius="full"
                fontWeight="semibold"
                size="lg"
              >
                Save Changes
              </Button>
            </VStack>
          </FormControl>
        </CardBody>
      </Card>
    </Flex>
  );
}