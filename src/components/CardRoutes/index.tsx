import { Flex, HStack, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ICardRoutes {
    name: string;
    route: string;
    isActive: boolean;
}

interface IProps {
    data: ICardRoutes[]
}

const CardRoutes = ({ data }: IProps) => {

    const router = useRouter();
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        const onMount = () => {
            const treatedRoutes = data.map(route => (
                {
                    ...route,
                    isActive: route.route === router.asPath
                }
            ))
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
                {routes.map(({ name, isActive }, index) => (
                    <Text
                        key={index}
                        height="100%"
                        display="flex"
                        alignItems="center"
                        fontWeight="bold"
                        cursor="pointer"
                        borderBottom={isActive ? '5px solid #FFBF00' : "5px solid transparent"}
                        color={isActive ? "yellow" : "gray.900"}
                        _hover={null}
                    >{name}</Text>

                ))}
            </HStack>
        </Flex>
    )
}

export default CardRoutes;