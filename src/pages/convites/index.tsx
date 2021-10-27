import { IconButton } from "@chakra-ui/button";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import CardUser from "../../components/CardUser";
import Layout from "../../components/Layout";
import { useAlert } from "../../contexts/AlertContext";
import { getAuth, patchAuth } from "../../services/apiAuth";
import { ROUTES_PROFILE } from "../../ultis/constants/menuRoutes";

interface IListInvitations {
    id: string;
    status_date: Date;
    invitation_status: boolean;
    company: {
        name_company: string;
        email: string;
        phone: string;
    }
}

const receivedInvitations = () => {

    const [invitationsAccepted, setInvitationsAccepted] = useState(null);
    const [invitations, setInvitations] = useState(null);
    const { setAlert } = useAlert();

    useEffect(() => {
        handleInvite();
    }, [])


    const handleInvite = async () => {
        try {
            const resp = await getAuth<IListInvitations[]>('/employees/invite')
            const invitationsFilter = [];
            const invitationsAcceptedFilter = [];
            for (const invite of resp) {
                if (invite.invitation_status === null) {
                    invitationsFilter.push(invite)
                } else if (invite.invitation_status === true) {
                    invitationsAcceptedFilter.push(invite);
                }
            }
            setInvitations(invitationsFilter)
            setInvitationsAccepted(invitationsAcceptedFilter)
        } catch (error) {
            setAlert({ message: error.message, color: 'error' });
        }

    }
    const handleInviteUpdate = async (id_contract, invitation_status) => {
        try {
            await patchAuth('/employees/invite', { id_contract, invitation_status })
            handleInvite();
        } catch (error) {
            setAlert({ message: error.message, color: 'error' });
        }

    }

    return (
        <Layout routesCard={ROUTES_PROFILE}>
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="40px">
                <Box>
                    <Text color="gray.900" fontSize="3xl">Convites Recebidos</Text>
                    <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                        <Flex pt="2" pb="2" alignItems="center">
                            {invitations && invitations.map(({ company, id }, index) => (
                                <CardUser key={index} name={company.name_company} email={company.email} avatar={null} >
                                    <Flex
                                        flexGrow={1}
                                        justifyContent="right">
                                        <IconButton
                                            onClick={() => handleInviteUpdate(id, true)}
                                            ml="2"
                                            mr="2"
                                            type="submit"
                                            bg="green"
                                            aria-label="Search database"
                                            icon={<FaCheck color="white" />}
                                        />
                                        <IconButton
                                            onClick={() => handleInviteUpdate(id, false)}
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
                        {invitationsAccepted && invitationsAccepted.map(({ company, id }, index) => (
                            <Flex pt="2" pb="2" alignItems="center" key={index}>
                                <CardUser  name={company.name_company} email={company.email} avatar={null} />
                            </Flex>

                        ))}
                    </Flex>
                </Box>
            </SimpleGrid>
        </Layout>
    )
}

export default receivedInvitations;