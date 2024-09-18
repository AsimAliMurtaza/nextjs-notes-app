"use client";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: "40vh",
          mx: "30",
        }}
      >
        <Text fontSize="2xl">Recent Entries</Text>

        <Button
          color="white"
          bg="black"
          _hover={{
            bg: "gray.800",
            shadow: "md",
          }}
          onClick={() => router.push("/newentry")}
        >
          <Box as="span" display="flex" alignItems="center">
            <PlusIcon style={{ marginRight: "8px" }} /> New Entry
          </Box>
        </Button>
      </Box>

      <Card
        sx={{
          mx: "30",
          my: "10",
          p: "4",
          boxShadow: "lg",
          borderRadius: "20",
          border: "1px solid",
        }}
      >
        <CardHeader fontWeight="bold" fontSize="2xl">
          Entry 1
        </CardHeader>
        <CardBody>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi cum
            officiis reprehenderit quae numquam. Vero vitae quia nesciunt sit
            suscipit temporibus similique dolores? Asperiores, error.
            Praesentium ex minus id consequuntur.
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
