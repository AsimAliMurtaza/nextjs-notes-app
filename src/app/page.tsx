import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
} from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
    <Box>
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
        >
          <PlusIcon />
          New Entry
        </Button>
      </Box>

      <Card
        sx={{
          mx: "30",
          my: "10",
          p: "4",
          boxShadow: "md",
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
    </Box>
  );
}
