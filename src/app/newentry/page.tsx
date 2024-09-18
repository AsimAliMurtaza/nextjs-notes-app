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
} from "@chakra-ui/react";

// Dynamically import React Quill for SSR compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css"; // Import Quill's snow theme for styling

export default function NewEntry() {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="60vh"
      paddingTop={{ base: 24, md: 24, lg: 32 }}
      zIndex={1}
    >
      <Card w="full" maxW={{ base: "400px", md: "600px", lg: "900px" }} border="1px solid">
        <CardHeader>
          <Text fontSize="xl">What's on your mind? 🤔</Text>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <Input type="text" placeholder="Title" mb={4} />

            {/* Scrollable React Quill Editor */}
            <Box
              mb={4}
              h="200px" /* Height for the editor content */
              overflow="auto" /* Enable scrolling */
              border="1px solid #ccc" /* Optional border for styling */
              borderRadius="8px"
            >
              <ReactQuill
                value={editorContent}
                onChange={handleEditorChange}
                theme="snow"
                placeholder="Start typing your content..."
                style={{
                  height: "100%", /* Editor should take full height of the container */
                }}
                modules={{
                  toolbar: [
                    [{ size: [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "blockquote", "code-block"],
                    [{ color: [] }, { background: [] }],
                  ],
                }}
              />
            </Box>

            <Button
              color="white"
              bg="black"
              _hover={{
                bg: "gray.800",
                shadow: "md",
              }}
            >
              Voila 🎉
            </Button>
          </FormControl>
        </CardBody>
      </Card>
    </Flex>
  );
}
