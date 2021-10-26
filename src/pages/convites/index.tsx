import { IconButton } from "@chakra-ui/button";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaUserPlus } from "react-icons/fa";
import CardUser from "../../components/CardUser";
import Layout from "../../components/Layout";
import { useAlert } from "../../contexts/AlertContext";
import { getAuth } from "../../services/apiAuth";
import { ROUTES_PROFILE } from "../../ultis/constants/menuRoutes";

const receivedInvitations = () => {

    const [invitationsAccepted, setInvitationsAccepted] = useState(null);
    const { setAlert } = useAlert();

    useEffect(() => {
        const onMount = async () => {
            try {
                const resp = await getAuth('/employees/invite')
                setInvitationsAccepted(resp);
            } catch (error) {
                setAlert({ message: error.message, color: 'error' });
            }
        }

        onMount()
    }, [])


    return (
        <Layout routesCard={ROUTES_PROFILE}>
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="40px">
                <Box>
                    <Text color="gray.900" fontSize="3xl">Convites Recebidos</Text>
                    <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                        <Flex pt="2" pb="2" alignItems="center">
                            {invitationsAccepted && invitationsAccepted.map(({ company }, index) => (
                                <CardUser key={index} name={company.name_company} email={company.email} avatar={null} >
                                    <Flex
                                        flexGrow={1}
                                        justifyContent="right">
                                        <IconButton
                                            ml="2"
                                            mr="2"
                                            type="submit"
                                            bg="green"
                                            aria-label="Search database"
                                            icon={<FaCheck color="white" />}
                                        />
                                        <IconButton
                                            ml="2"
                                            mr="4"
                                            type="submit"
                                            bg="red"
                                            aria-label="Search database"
                                            icon={<FaTimes color="white" />}
                                        />
                                    </Flex>

                                </CardUser>

                            ))}
                        </Flex>
                    </Flex>
                </Box>

                <Box>
                    <Text color="gray.900" fontSize="3xl">Convites Aceitos</Text>
                    <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                        <Flex pt="2" pb="2" alignItems="center">
                            <CardUser name="Henrique Suel" email="h.suel17@hotmail.com" avatar={null} />
                        </Flex>
                    </Flex>
                </Box>
            </SimpleGrid>
        </Layout>
    )
}

export default receivedInvitations;