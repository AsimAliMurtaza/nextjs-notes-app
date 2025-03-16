"use client";

import React, { useState } from "react";
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
  Divider,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import { SaveIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import "react-quill/dist/quill.snow.css";
import { Session } from "next-auth";

interface SessionWithId extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton height="400px" />,
});

export default function NewEntry() {
  const [editorContent, setEditorContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { data: session, status } = useSession() as {
    data: SessionWithId | null;
    status: string;
  };

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("green.500", "green.600");
  const buttonHoverBg = useColorModeValue("green.600", "green.700");

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  const clearForm = () => {
    setTitle("");
    setEditorContent("");
  };

  const handleSaveEntry = async () => {
    if (!title.trim() || !editorContent.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both the title and content.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (status !== "authenticated" || !session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to save a note.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/save-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: session.user.id,
          title,
          content: editorContent,
        }),
      });

      if (response.ok) {
        toast({
          title: "Entry Saved",
          description: "Your journal entry has been saved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        clearForm();
      } else {
        throw new Error("Failed to save note");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      toast({
        title: "Error",
        description: "Failed to save note. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
      bg={bgColor}
      p={4}
    >
      <Card
        w="full"
        maxW="800px"
        bg={cardBg}
        borderColor={borderColor}
        boxShadow="md"
        borderRadius="lg"
      >
        <CardHeader display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold" color={textColor}>
            New Note
          </Text>
          <IconButton
            icon={<XIcon />}
            aria-label="Clear Form"
            size="sm"
            onClick={clearForm}
            variant="ghost"
          />
        </CardHeader>
        <Divider borderColor={borderColor} />
        <CardBody>
          <FormControl mb={6}>
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
                h="400px"
                overflow="auto"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                bg={useColorModeValue("white", "gray.700")}
              >
                <ReactQuill
                  value={editorContent}
                  onChange={handleEditorChange}
                  theme="snow"
                  placeholder="Start typing your content..."
                  style={{
                    height: "100%",
                    borderRadius: "8px",
                    border: "none",
                  }}
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
                borderRadius="full"
                leftIcon={<Icon as={SaveIcon} />}
                onClick={handleSaveEntry}
                size="lg"
                fontWeight="semibold"
                isLoading={isLoading}
                loadingText="Saving..."
                aria-label="Save note"
              >
                Save
              </Button>
            </VStack>
          </FormControl>
        </CardBody>
      </Card>
    </Flex>
  );
}