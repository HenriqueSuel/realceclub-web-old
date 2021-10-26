import { useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    Heading,
    Image
} from '@chakra-ui/react'
import { PhoneIcon, EmailIcon, CalendarIcon, ChevronLeftIcon, } from '@chakra-ui/icons';
import { FaSuitcaseRolling, FaUser } from 'react-icons/fa';
import NavItem from '../NavItem'


const SideBar = () => {
    const [navSize, changeNavSize] = useState("small")

    return (
        <>
            <Flex
                pos="sticky"
                boxShadow="2xl"
                w={navSize == "small" ? "75px" : "200px"}
                flexDir="column"
                justifyContent="space-between"
                bg="white"
                color="white"
                minHeight="100vh"
            >
                <Flex
                    p="4"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    as="nav"
                >
                    <Image
                        margin="auto"
                        borderRadius="full"
                        src="/images/realceclub.png"
                        alt="Segun Adebayo"
                        onClick={() => {
                            if (navSize == "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    <NavItem navSize={navSize} icon={FaUser} title="Funcionarios" active />
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
                            <Text color="gray.300">Nome da empresa</Text>
                        </Flex>
                    </Flex>
                </Flex>

            </Flex>
        </>
    )

}

export default SideBar