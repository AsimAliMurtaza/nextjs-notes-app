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
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";
import {
  BiMenuAltLeft,
  BiMenu,
  BiArchive,
  BiBulb,
  BiTrash,
  BiLabel,
} from "react-icons/bi";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";

interface ModuleItem {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  path: string;
}

const modules: ModuleItem[] = [
  { name: "Notes", icon: BiBulb, path: "/dashboard" },
  { name: "Archived", icon: BiArchive, path: "/dashboard/archive" },
  { name: "Labels", icon: BiLabel, path: "/dashboard/lables" },
  { name: "Trash", icon: BiTrash, path: "/dashboard/trash" },
  { name: "Settings", icon: FiSettings, path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Responsive settings
  const isMobile = useBreakpointValue({ base: true, md: false });
  const sidebarDisplay = useBreakpointValue({
    base: "none",
    md: "flex",
  });

  const hoverColor = useColorModeValue("green.400", "green.700");
  const textColor = useColorModeValue("gray.800", "white");
  const sidebarBg = useColorModeValue("white", "gray.900");
  const sidebarBorderColor = useColorModeValue("gray.200", "gray.700");
  const menuBg = useColorModeValue("white", "gray.800");
  const menuHoverBg = useColorModeValue("gray.100", "gray.700");
  const menuListBg = useColorModeValue("white", "gray.800");
  const mainBg = useColorModeValue("gray.100", "gray.900");
  const sidebarWidth = collapsed ? "88px" : "250px";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Flex justify="center" align="center" height="100vh" bg={sidebarBg}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* Sidebar Top */}
      <Box>
        {/* Toggle Button - Only show on desktop or when not in mobile mode */}
        {!isMobile && (
          <Flex justify="space-between" align="center" mb={8}>
            {!collapsed && (
              <Text fontSize="2xl" fontWeight="semibold">
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
        )}

        {/* Sidebar Links */}
        <VStack align="start" spacing={2} w="full">
          {modules.map((module) => (
            <NavItem
              key={module.name}
              icon={module.icon}
              label={module.name}
              isActive={pathname === module.path}
              hoverColor={hoverColor}
              onClick={() => {
                router.push(module.path);
                if (isMobile) setIsMobileSidebarOpen(false);
              }}
              collapsed={isMobile ? false : collapsed}
            />
          ))}
        </VStack>
      </Box>

      {/* User Profile Section */}
      {session && (
        <Box mt="auto">
          <Divider mb={4} borderColor={sidebarBorderColor} />
          <Menu>
            <MenuButton w="full">
              <Flex zIndex={1200} align="center" p={2}>
                <Avatar size="sm" src={session.user?.image || ""} />
                {(!collapsed || isMobile) && (
                  <Text ml={3} fontSize="md" fontWeight="medium">
                    {session.user?.name}
                  </Text>
                )}
              </Flex>
            </MenuButton>
            <MenuList
              zIndex={1200}
              bg={menuListBg}
              borderColor={sidebarBorderColor}
            >
              <MenuItem
                icon={<FaUser />}
                onClick={() => {
                  router.push("/dashboard/profile");
                  if (isMobile) setIsMobileSidebarOpen(false);
                }}
                bg={menuBg}
                _hover={{ bg: menuHoverBg }}
              >
                Profile
              </MenuItem>
              <MenuItem
                icon={<FiLogOut />}
                onClick={() => signOut()}
                bg={menuBg}
                _hover={{ bg: menuHoverBg }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </>
  );

  return (
    <Flex h="100vh" overflow="hidden" position="relative">
      {/* Mobile Sidebar Toggle Button */}
      {isMobile && (
        <IconButton
          aria-label="Open sidebar"
          icon={<BiMenuAltLeft size={24} />}
          variant="ghost"
          position="fixed"
          top={4}
          left={4}
          zIndex="1100"
          onClick={() => setIsMobileSidebarOpen(true)}
        />
      )}

      {/* Desktop Sidebar */}
      <Box
        position="fixed"
        h="100vh"
        w={collapsed ? "88px" : "250px"}
        bg={sidebarBg}
        color={textColor}
        pr={6}
        pl={6}
        pt={6}
        borderRight="1px solid"
        borderColor={sidebarBorderColor}
        transition="width 0.3s ease-in-out"
        overflow="hidden"
        display={sidebarDisplay}
        flexDirection="column"
        justifyContent="space-between"
        zIndex="1100"
        onMouseEnter={() => !isMobile && setCollapsed(false)}
        onMouseLeave={() => !isMobile && setCollapsed(true)}
      >
        {renderSidebarContent()}
      </Box>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        isOpen={isMobileSidebarOpen}
        placement="left"
        onClose={() => setIsMobileSidebarOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg} maxW="250px">
          <DrawerCloseButton />
          <DrawerBody p={6} display="flex" flexDirection="column">
            {renderSidebarContent(true)}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box
        flex="1"
        maxW="100vw"
        ml={{ base: "0", md: sidebarWidth }}
        transition="margin-left 0.3s ease-in-out"
        overflowY="auto"
        bg={mainBg}
        pt={{ base: "70px", md: "0" }}
      >
        {children}
      </Box>
    </Flex>
  );
};

interface NavItemProps {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  isActive: boolean;
  hoverColor: string;
  onClick: () => void;
  collapsed: boolean;
}

const NavItem = ({
  icon: Icon,
  label,
  isActive,
  hoverColor,
  onClick,
  collapsed,
}: NavItemProps) => {
  const itemBg = useColorModeValue(
    isActive ? "green.100" : "transparent",
    isActive ? "green.800" : "transparent"
  );
  const itemColor = useColorModeValue(
    isActive ? "green.700" : "inherit",
    isActive ? "green.200" : "inherit"
  );
  const itemHoverBg = useColorModeValue(hoverColor, hoverColor);
  const itemHoverColor = useColorModeValue("white", "white");

  return (
    <Tooltip label={collapsed ? label : ""} placement="right">
      <Flex
        align="center"
        w="full"
        borderRightRadius={collapsed ? "full" : "full"}
        borderLeftRadius={!collapsed ? "none" : "full"}
        cursor="pointer"
        bg={itemBg}
        color={itemColor}
        _hover={{
          bg: itemHoverBg,
          color: itemHoverColor,
          transform: "scale(1.02)",
          transition: "0.2s",
        }}
        onClick={onClick}
      >
        <IconButton
          aria-label={label}
          icon={<Icon size={20} />}
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