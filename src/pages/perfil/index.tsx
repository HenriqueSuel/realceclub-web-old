
import { Avatar } from "@chakra-ui/avatar";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import CardRoutes from "../../components/CardRoutes";
import FormProfile from "../../components/FormProfile";
import FormAddress from "../../components/FormAddress";
import SideBar from "../../components/SideBar";
import { ROUTES_PROFILE } from "../../ultis/constants/menuRoutes";
import { useContext, useEffect } from "react";
import { getAuth } from "../../services/apiAuth";
import { useAlert } from "../../contexts/AlertContext";
import { AuthContext } from "../../contexts/AuthContext";

type User = {
    email: string;
    phone: string;
    cnpj?: string;
    cpf?: string;
    name_company?: string;
    full_name?: string;
};


const Profile = () => {
    const { setAlert } = useAlert();
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        const onMount = async () => {
            try {
                const resp = await getAuth<User>("/company/me");
                setUser({ ...resp })
            } catch (error) {
                setAlert({ message: error.message, color: 'error' });
            }
        }

        if (!user) {
            onMount();
        }
    }, [])

    return (
        <Flex w="100%">
            <SideBar />

            <Flex direction="column" width="100%">
                <CardRoutes data={ROUTES_PROFILE} />

                <Container
                    marginTop="8"
                    maxW="container.xl">

                    <Box>
                        <Text color="gray.900" fontSize="3xl">Perfil</Text>

                        <Flex justifyContent="center" marginBottom="4">
                            <Avatar size="2xl" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        </Flex>

                        <Flex pt="6" pl="6" pb="6"
                            boxShadow="base" direction="column" >
                            <FormProfile></FormProfile>
                        </Flex>


                        <Text mt="10" mb="3" color="gray.900" fontSize="3xl">Endereço</Text>
                        <Flex pt="6" pl="6" pb="6"
                            boxShadow="base" direction="column" >
                            <FormAddress></FormAddress>
                        </Flex>
                    </Box>
                </Container >
            </Flex >
        </Flex >
    )
}

export default Profile;