import { Button } from "@chakra-ui/button";
import { Box, Flex, Container, Text, HStack } from "@chakra-ui/layout";
import { Input } from "../../components/Input";
import SideBar from "../../components/SideBar";


const dashboard = () => {
    return (
        <Flex w="100%">
            <SideBar />

            <Flex direction="column" width="100%">
                <Flex bg="white.200" p="6" direction="column" minHeight="100vh">
                    <Text color="gray.900" fontSize="4xl" fontWeight="800">Administrar Funcionarios</Text>

                    <Flex

                        width="100%"
                        p="8"
                        bg="white"
                        direction="column"
                    >
                        <Flex>
                            <HStack spacing="24px">
                                <Text fontWeight="bold" cursor="pointer" borderBottom="3px solid transparent" color="gray.900" _hover={{ borderBottom: '3px solid #181B23' }}>Meus Funcionarios</Text>
                                <Text fontWeight="bold" cursor="pointer" borderBottom="3px solid transparent" color="gray.900" _hover={{ borderBottom: '3px solid #181B23' }}>Convites</Text>
                            </HStack>

                        </Flex>


                        <Flex mt="8">
                            <Input
                                placeholder="CPF"
                                name="cpf"
                                type="string"
                            />

                            <Button
                                ml="8"
                                type="submit"
                                colorScheme="pink"
                                size="lg"
                            >
                                Buscar
                            </Button>
                        </Flex>

                    </Flex>

                </Flex>

            </Flex>
        </Flex>
    )

}

export default dashboard;