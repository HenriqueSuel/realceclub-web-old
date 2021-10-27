import { useEffect, useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    Image
} from '@chakra-ui/react'
import NavItem from '../NavItem'
import { ROUTES_SLIDE_BAR } from '../../ultis/constants/menuRoutes';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';


const SideBar = () => {
    const router = useRouter();
    const [navSize, changeNavSize] = useState("small");

    const redirectProfile = () => {
        const { 'nextauth.type': type } = parseCookies();
        const route = type === 'company' ? 'perfil' : 'convites';
        router.push(route)
    }
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
                    {ROUTES_SLIDE_BAR.map((routes, index) => (
                        <NavItem key={index} navSize={navSize} icon={routes.icon} route={routes.route} title={routes.name} />
                    ))}
                </Flex>

                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize == "small" ? "center" : "flex-start"}
                    mb={4}
                >
                    <Divider display={navSize == "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center" onClick={redirectProfile}>
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