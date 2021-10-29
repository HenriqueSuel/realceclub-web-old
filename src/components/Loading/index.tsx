import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner"
import { useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";


const LoadingPage = () => {


    const { isLoading } = useLoading();

    useEffect(() => {
        console.log(isLoading)
    }, [])

    return (
        <>
            {isLoading && (
                <Flex position="absolute" width="100vw" height="100vh" bg="#3333338f" zIndex={100}>
                    <Spinner
                        position="relative"
                        top="50%"
                        left="50%"
                        transform="translate (-50%, 50%)"
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Flex>
            )}
        </>
    )
}

export default LoadingPage;