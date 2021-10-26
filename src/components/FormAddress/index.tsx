
import { Flex, SimpleGrid } from "@chakra-ui/layout";
import { Input } from "../Input";


const FormAddress = () => {

    return (
        <Flex
            display="flex"
            justifyContent="center"
            alignSelf="center"
            as="form"
            w="100%"
        >
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} w="100%" spacing="40px">
                <Input
                    name="CEP"
                    type="text"
                    label="CEP"
                />
                <Input
                    name="Rua"
                    type="text"
                    label="Rua"
                />
                <Input
                    name="Bairro"
                    type="text"
                    label="Bairro"
                />
                <Input
                    name="estado"
                    type="text"
                    label="Estado"
                />
                <Input
                    name="Cidade"
                    type="text"
                    label="cidade"
                />
                <Input
                    name="numero"
                    type="text"
                    label="Numero"
                />
                <Input
                    name="Complemento"
                    type="text"
                    label="complemento"
                />
            </SimpleGrid>
        </Flex>
    )
}

export default FormAddress