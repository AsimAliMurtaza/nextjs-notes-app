import { Box, Button, Text } from "@chakra-ui/react";
import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
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
      <Text fontSize="2xl">
        Recent Entries
      </Text>

      <Button color="white" bg="black" _hover={{
        bg: "gray.800",
        shadow: "md",
      }}>
        <PlusIcon />
        New Entry
      </Button>
    </Box>
  );
}
