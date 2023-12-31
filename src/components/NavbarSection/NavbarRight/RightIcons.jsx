import React from "react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
} from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import { Box, Flex, Icon } from "@chakra-ui/react";

const RightIcons = () => {
  return (
    <Flex alignItems="center" flexGrow={1}>
      <Box
        display={{ base: "none", md: "flex" }}
        alignItems="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>
        <Flex
          mr={2}
          ml={2}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>

        <Flex
          mr={2}
          ml={2}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
      
      </Box>
      <>
        <Flex
          mr={2}
          ml={2}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
      
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={4}
          ml={2}
          padding={1}
          cursor="pointer"
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </>
    </Flex>
  );
};

export default RightIcons;
