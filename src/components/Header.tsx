"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, BookOpenIcon, UserIcon } from "lucide-react";
import {
  Button,
  Text,
  Box,
  Flex,
  useDisclosure,
  Image,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from "@chakra-ui/react";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as="header"
      boxShadow="md"
      position="fixed"
      width="100%"
      zIndex="1000"
      px={{ base: 2, lg: 4 }}
      py={4}
      bg="white" // Added background color
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Title and Burger Menu for Small Screens */}
        <Flex
          align="center"
          display={{ base: "flex", md: "none" }}
          justify="space-between"
          width="100%"
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <Box
                fontWeight="bold"
                fontSize="lg"
                display="flex"
                alignItems="center"
                gap="4"
              >
                <BookOpenIcon className="mr-8" />
                MyJournal
              </Box>
            </Flex>
          </Link>
          <Button
            onClick={onOpen}
            variant="outline"
            size="sm"
            bg="gray.200" // Updated button background for visibility
            _hover={{ bg: "gray.300" }}
            aria-label="Menu"
          >
            Menu
          </Button>
        </Flex>

        {/* Full Menu for Larger Screens */}
        <Flex
          align="center"
          gap={4}
          display={{ base: "none", md: "flex" }}
          justify="space-between"
          width="100%"
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <Box
                fontWeight="bold"
                fontSize="2xl"
                display="flex"
                alignItems="center"
                gap="4"
              >
                <BookOpenIcon className="mr-2" />
                MyJournal
              </Box>
            </Flex>
          </Link>

          <Menu>
            <MenuButton>
              <Image
                alt="dp"
                src="/path-to-image.jpg" // Add a valid image source
                border="1px solid black"
                borderRadius="full"
                boxSize="40px"
                _hover={{ cursor: "pointer" }}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Button color="black" variant="ghost" w="100%">
                  Sign Out
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="black" variant="ghost" w="100%">
                  My Account
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* Drawer for Small Screens */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay
          sx={{
            backdropFilter: "blur(4px)",
            background: "rgba(0, 0, 0, 0.2)",
          }}
        />
        <DrawerContent
          sx={{
            backdropFilter: "blur(4px)",
            background: "rgba(255, 255, 255, 0.6)",
          }}
        >
          <DrawerCloseButton />
          <DrawerBody>
            <Flex direction="column" gap={2} mt={4}>
              <Link href="/" passHref>
                <Button
                  variant="ghost"
                  fontSize="lg"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "gray.100", textColor: "black" }}
                >
                  Home
                </Button>
              </Link>
              <Link href="/account" passHref>
                <Button
                  variant="ghost"
                  fontSize="lg"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "gray.100", textColor: "black" }}
                >
                  Account
                </Button>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
