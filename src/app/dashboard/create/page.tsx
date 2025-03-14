'use client';

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
  HStack,
  useToast,
} from "@chakra-ui/react";
import { PlusIcon, SaveIcon } from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewEntry() {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const buttonBg = useColorModeValue("black", "blue.500");
  const buttonHoverBg = useColorModeValue("gray.800", "blue.600");

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  const handleSaveEntry = () => {
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

    // Simulate saving the entry (replace with actual API call)
    console.log("Title:", title);
    console.log("Content:", editorContent);

    toast({
      title: "Entry Saved",
      description: "Your journal entry has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Clear the form after saving
    setTitle("");
    setEditorContent("");
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
      bg={bgColor}
      p={8}
    >
      <Card
        w="full"
        maxW={{ base: "400px", md: "600px", lg: "900px" }}
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="2xl"
        boxShadow="lg"
      >
        <CardHeader>
          <Text fontSize="2xl" fontWeight="bold" color={textColor}>
            What's on your mind? 🤔
          </Text>
        </CardHeader>
        <CardBody>
          <FormControl mb={6}>
            <VStack spacing={6} align="start">
              {/* Title Input */}
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                borderRadius="lg"
                borderColor={borderColor}
                _focus={{ borderColor: "blue.500", boxShadow: "sm" }}
              />

              {/* React Quill Editor */}
              <Box
                w="full"
                h="300px"
                overflow="auto"
                border="1px solid"
                borderColor={borderColor}
                borderRadius="lg"
              >
                <ReactQuill
                  value={editorContent}
                  onChange={handleEditorChange}
                  theme="snow"
                  placeholder="Start typing your content..."
                  style={{
                    height: "100%",
                    borderRadius: "8px",
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

              {/* Save Button */}
              <Button
                color="white"
                bg={buttonBg}
                _hover={{
                  bg: buttonHoverBg,
                  shadow: "md",
                }}
                borderRadius="full"
                leftIcon={<Icon as={SaveIcon} />}
                onClick={handleSaveEntry}
              >
                Save Entry
              </Button>
            </VStack>
          </FormControl>
        </CardBody>
      </Card>
    </Flex>
  );
}