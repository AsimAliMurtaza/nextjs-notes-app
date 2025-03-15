"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  VStack,
  Text,
  IconButton,
  Flex,
  useColorModeValue,
  Tooltip,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { BiHome, BiMenuAltLeft, BiMenu, BiArchive } from "react-icons/bi";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

const modules = [
  { name: "My Notes", icon: BiHome, path: "/dashboard" },
  { name: "Archived", icon: BiArchive, path: "/dashboard/archive" },
  { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const hoverColor = useColorModeValue("green.400", "green.700");
  const textColor = useColorModeValue("gray.800", "white");
  const sidebarBg = useColorModeValue("gray.50", "gray.900");

  const sidebarWidth = collapsed ? "88px" : "250px";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex h="100vh" overflow="hidden">
      {/* Sidebar */}
      <Box
        position="fixed"
        h="100vh"
        w={sidebarWidth}
        bg={sidebarBg}
        color={textColor}
        p={6}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        transition="width 0.3s ease-in-out"
        overflow="hidden"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        zIndex="1100"
      >
        {/* Sidebar Top */}
        <Box>
          {/* Toggle Button */}
          <Flex justify="space-between" align="center" mb={8}>
            {!collapsed && (
              <Text fontSize="2xl" fontWeight="thin">
                Notes
              </Text>
            )}
            <IconButton
              aria-label="Toggle Sidebar"
              icon={
                collapsed ? <BiMenu size={24} /> : <BiMenuAltLeft size={24} />
              }
              variant="ghost"
              borderRadius="full"
              onClick={() => setCollapsed(!collapsed)}
            />
          </Flex>

          {/* Sidebar Links */}
          <VStack align="start" spacing={2} w="full">
            {modules.map((module) => (
              <NavItem
                key={module.name}
                icon={module.icon}
                label={module.name}
                isActive={pathname === module.path}
                hoverColor={hoverColor}
                onClick={() => router.push(module.path)}
                collapsed={collapsed}
              />
            ))}
          </VStack>
        </Box>

        {/* User Profile Section */}
        {session && (
          <Box mt="auto">
            <Divider mb={4} />
            <Menu>
              <MenuButton w="full">
                <Flex zIndex={1200} align="center" p={2}>
                  <Avatar size="sm" src={session.user?.image || ""} />
                  {!collapsed && (
                    <Text ml={3} fontSize="md" fontWeight="medium">
                      {session.user?.name}
                    </Text>
                  )}
                </Flex>
              </MenuButton>
              <MenuList zIndex={1200}>
                <MenuItem
                  icon={<FaUser />}
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Profile
                </MenuItem>
                <MenuItem icon={<FiLogOut />} onClick={() => signOut()}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Box>

      {/* Main Content */}
      <Box
        flex="1"
        maxW="100vw"
        ml={sidebarWidth}
        transition="margin-left 0.3s ease-in-out"
        overflowY="auto"
      >
        {children}
      </Box>
    </Flex>
  );
};

// Navigation Item Component
const NavItem = ({
  icon,
  label,
  isActive,
  hoverColor,
  onClick,
  collapsed,
}: {
  icon: any;
  label: string;
  isActive: boolean;
  hoverColor: string;
  onClick: () => void;
  collapsed: boolean;
}) => {
  return (
    <Tooltip label={collapsed ? label : ""} placement="right">
      <Flex
        align="center"
        w="full"
        borderRadius="50"
        cursor="pointer"
        bg={isActive ? "green.500" : "transparent"}
        color={isActive ? "white" : "inherit"}
        _hover={{
          bg: hoverColor,
          color: "white",
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
        onClick={onClick}
      >
        <IconButton
          aria-label={label}
          icon={icon({ size: 20 })}
          variant="ghost"
          color="inherit"
          _hover={{ bg: "transparent" }}
        />
        {!collapsed && (
          <Text ml={2} fontWeight="medium">
            {label}
          </Text>
        )}
      </Flex>
    </Tooltip>
  );
};

export default DashboardLayout;
