import { Flex, HStack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";


const CardRoutes = ({ data }) => {

    const router = useRouter();
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        const onMount = () => {
            const { 'nextauth.type': type } = parseCookies();
            const treatedRoutes = data.filter(route => {
                if (route.rules.some(rule => type === rule)) {
                    return route
                }
            })
            setRoutes(treatedRoutes)
        }
        onMount();
    }, [])



    return (
        <Flex
            boxShadow="base"
            direction="column"
            height="16"
            pl="9"
        >
            <HStack spacing="24px" height="100%">
                {routes.map(({ name, route }, index) => (
                    <Text
                        key={index}
                        height="100%"
                        display="flex"
                        alignItems="center"
                        fontWeight="bold"
                        cursor="pointer"
                        borderBottom={route === router.asPath ? '5px solid #FFBF00' : "5px solid transparent"}
                        color={route === router.asPath ? "yellow" : "gray.900"}
                        _hover={null}
                        onClick={() => router.push(route)}
                    >{name}</Text>

                ))}
            </HStack>
        </Flex>
    )
}

export default CardRoutes;