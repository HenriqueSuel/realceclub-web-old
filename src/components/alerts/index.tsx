import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { CloseButton } from "@chakra-ui/close-button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import { SlideFade } from "@chakra-ui/transition";
import { useEffect } from "react";
import { useAlert } from "../../contexts/AlertContext";


const Alerts = () => {
    const { color, message, setAlert } = useAlert();
    const { isOpen, onToggle } = useDisclosure()

    useEffect(() => {
        const openAlert = () => {
            if (message) {
                onToggle();
            }
        }
        openAlert();
    }, [message])

    useEffect(() => {
        const closeAlert = () => {
            setTimeout(() => {
                if (isOpen) {
                    setAlert({ message: null, color });
                    onToggle();
                }
            }, 3000);
        }
        closeAlert();
    }, [isOpen])





    return (
        <SlideFade in={isOpen} offsetY="20px">
            <Box position="relative">
                <Box position="absolute" width="300px" marginTop="8" marginRight="8" right="0">
                    <Alert status={color}>
                        <AlertIcon />
                        <AlertTitle color="gray.900" mr={2}>{message}</AlertTitle>
                        <CloseButton position="absolute" color="gray.900" right="8px" top="8px" onClick={onToggle} />
                    </Alert>
                </Box>
            </Box>
        </SlideFade>
    )
}

export default Alerts;