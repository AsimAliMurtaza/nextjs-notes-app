"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, BookOpenIcon, UserIcon } from "lucide-react"
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
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Title and Burger Menu */}
        <Flex
          align="center"
          gap={0}
          display={{ base: "flex", md: "none" }}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
            <Box fontWeight="bold" fontSize="lg" display="flex" alignItems="center" gap="4">
              <BookOpenIcon className="mr-8" />
                MyJournal
              </Box>
            </Flex>
          </Link>
          <Button
            onClick={onOpen}
            variant="outline"
            colorScheme="white"
            size="sm"
            aria-label="Menu"
          >
          Menu</Button>
        </Flex>

        {/* Full Menu for larger screens */}
        <Flex
          align="center"
          gap={4}
          display={{ base: "none", md: "flex" }}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <Box fontWeight="bold" fontSize="2xl" display="flex" alignItems="center" gap="4">
              <BookOpenIcon className="mr-2" />
                MyJournal
              </Box>
            </Flex>
          </Link>
          
          
          
          <Menu>
            <MenuButton
              sx={{
                marginRight: "5px",
              }}
            >
              <Image
                alt="dp"
                border="1px solid black"
                borderRadius="full"
                boxSize="40px"
                _hover={{ cursor: "pointer" }}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Button
                  color="black"
                  variant="ghost"
                  w="100%"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Sign Out
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="black"
                  variant="ghost"
                  w="100%"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  My Account
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              padding: 4,
            }}
          >
          </Box>

          <DrawerBody>
            <Flex direction="column" gap={2}>
              <Link href="/" passHref>
                <Button
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="white"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "white", textColor : "black", cursor: "pointer" }}
                >
                  Home
                </Button>
              </Link>
              <Link href="/account" passHref>
                <Button
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="white"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "white", textColor : "black", cursor: "pointer" }}
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
