import { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import { HamburgerIcon, PhoneIcon, EmailIcon, CalendarIcon, ChevronLeftIcon, } from '@chakra-ui/icons';
import { FaSuitcaseRolling } from 'react-icons/fa';
import NavItem from '../NavItem'


const SideBar = () => {
    const [navSize, changeNavSize] = useState("large")

    return (
        <>
            <Flex
                pos="sticky"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                w={navSize == "small" ? "75px" : "200px"}
                flexDir="column"
                justifyContent="space-between"
                bg="gray.800"
                color="white"
            >
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        aria-label="Menu Hamburger"
                        background="none"
                        mt={5}
                        _hover={{ background: 'none' }}
                        colorScheme="teal"
                        icon={<HamburgerIcon />}
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    <NavItem navSize={navSize} icon={FaSuitcaseRolling} title="Funcionarios" active />
                    <NavItem navSize={navSize} icon={CalendarIcon} title="Calendar" />
                    <NavItem navSize={navSize} icon={ChevronLeftIcon} title="Clients" />
                    <NavItem navSize={navSize} icon={EmailIcon} title="Animals" />
                    <NavItem navSize={navSize} icon={PhoneIcon} title="Stocks" />
                    <NavItem navSize={navSize} icon={CalendarIcon} title="Reports" />
                    <NavItem navSize={navSize} icon={ChevronLeftIcon} title="Settings" />
                </Flex>

                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    mb={4}
                >
                    <Divider display={navSize == "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center">
                        <Avatar size="sm" src="avatar-1.jpg" />
                        <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                            <Heading as="h3" size="sm">Sylwia Weller</Heading>
                            <Text color="gray">Admin</Text>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </>
    )

}

export default SideBar