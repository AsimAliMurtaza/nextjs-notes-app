// pages/dashboard/edit/[id].tsx
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
} from "@chakra-ui/react";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function EditNote({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Fetch the note data
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
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="flex-start" minH="100vh">
      <Card
        w="full"
        bg={useColorModeValue("gray.50", "gray.900")}
        boxShadow="lg"
      >
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold">
            Edit Note
          </Text>
        </CardHeader>
        <CardBody>
          <FormControl mb={4}>
            <VStack spacing={6} align="start">
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                borderRadius="lg"
              />
              <Box
                w="full"
                h="300px"
                overflow="auto"
                border="1px solid"
                borderRadius="lg"
              >
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  theme="snow"
                  placeholder="Start typing your content..."
                  style={{ height: "100%" }}
                />
              </Box>
              <Button
                colorScheme="green"
                leftIcon={<Icon as={SaveIcon} />}
                onClick={handleSave}
                borderRadius="full"
                variant="ghost"
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
