import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Text, SimpleGrid, Container } from "@chakra-ui/layout";
import SideBar from "../../components/SideBar";
import { Input } from '../../components/Input';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useAlert } from "../../contexts/AlertContext";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import CardUser from "../../components/CardUser";
import CardRoutes from "../../components/CardRoutes";
import { getAuth, postAuth } from "../../services/apiAuth";
import { useEffect, useState } from "react";
import { ROUTES } from "../../ultis/constants/menuRoutes";

interface IListEmployees {
    id: string;
    status_date: Date;
    invitation_status: boolean;
    employees: {
        full_name: string;
        email: string;
        phone: string;
    }
}



const searchFormSchema = yup.object().shape({
    cpf: yup.string().required('CPF é obrigatio'),
})

const dashboard = () => {

    const [employeesFound, setEmployeesFound] = useState(null);
    const [inviteEmployees, setInviteEmployees] = useState(null);
    const [hiredEmployees, setHiredEmployees] = useState(null);

    const { setAlert } = useAlert();
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(searchFormSchema)
    })

    const { errors } = formState

    const handleSearch: SubmitHandler<{ cpf: string }> = async (values) => {
        setEmployeesFound(null);
        try {
            const url = `/employees/search?cpf=${values.cpf}`
            const employee = await getAuth(url);
            setEmployeesFound(employee);
        } catch (err) {
            setEmployeesFound(null);
            setAlert({ message: err.message, color: 'error' });
        }
    }

    const handleInvite = async () => {
        try {
            await postAuth('/company/invite', { cpf: employeesFound.cpf });
            setAlert({ message: 'Convite realiado com sucesso', color: 'success' });
            handleGetInvites();
            setEmployeesFound(null);
        } catch (error) {
            setAlert({ message: error.message, color: 'error' });
        }
    }

    const handleGetInvites = async () => {
        try {
            const invites = await getAuth<IListEmployees[]>('/company/invite');
            handleFilterEmployees(invites)
            setEmployeesFound(null);
        } catch (error) {
            setAlert({ message: error.message, color: 'error' });
        }
    }

    const handleFilterEmployees = async (invites: IListEmployees[]) => {
        const guest = [];
        const hired = [];
        for (const invite of invites) {
            if (invite.invitation_status === null) {
                console.log('entrou convidado')
                guest.push(invite)
            } else if (invite.invitation_status === true) {
                console.log('entrou contratado')
                hired.push(invite);
            }
        }
        setHiredEmployees(hired)
        setInviteEmployees(guest)
    }

    useEffect(() => {
        const onMount = () => {
            handleGetInvites();
        }
        onMount();
    }, []);


    return (
        <Flex w="100%">
            <SideBar />

            <Flex direction="column" width="100%">
                <CardRoutes data={ROUTES} />

                <Container
                    marginTop="8"
                    maxW="container.xl">
                    <SimpleGrid columns={{ sm: 1, md: 1, lg: 1, xl: 1 }} spacing="40px">
                        <Box>
                            <Text color="gray.900" fontSize="3xl">Convidar</Text>

                            <Flex boxShadow="base" pt="2" pl="6" direction="column" >


                                <Flex pt="2" pb="2" alignItems="center">
                                    <Flex
                                        display="flex"
                                        justifyContent="center"
                                        alignSelf="center"
                                        as="form"
                                        w="100%"
                                        onSubmit={handleSubmit(handleSearch)}
                                    >
                                        <Input
                                            placeholder="CPF"
                                            name="cpf"
                                            type="cpf"
                                            mask="999.999.999-99"
                                            error={errors.cpf}
                                            {...register('cpf')}
                                        />
                                        <IconButton
                                            ml="4"
                                            mr="4"
                                            type="submit"
                                            bg="yellow"
                                            aria-label="Search database"
                                            icon={<FaSearch />}
                                            isLoading={formState.isSubmitting}
                                        />
                                    </Flex>

                                </Flex>

                                {employeesFound && (
                                    <CardUser name={employeesFound?.full_name} email={employeesFound?.email} avatar={null} >
                                        <Flex
                                            flexGrow={1}
                                            justifyContent="right">
                                            <IconButton
                                                ml="4"
                                                mr="4"
                                                type="submit"
                                                bg="green"
                                                aria-label="Search database"
                                                icon={<FaUserPlus color="white" />}
                                                onClick={handleInvite}
                                            />
                                        </Flex>

                                    </CardUser>
                                )}
                            </Flex>
                        </Box>
                    </SimpleGrid>

                    <SimpleGrid marginTop="8" columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing="40px">
                        <Box>
                            <Text color="gray.900" fontSize="3xl">Convites ativos</Text>

                            <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                                {inviteEmployees && (
                                    inviteEmployees.map(({ employees, status_date }, index) => (
                                        <CardUser key={index} name={employees.full_name} date={status_date} avatar={null} />
                                    ))
                                )}

                            </Flex>
                        </Box>
                        <Box>
                            <Text color="gray.900" fontSize="3xl">Funcionarios</Text>

                            <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                                {hiredEmployees && (
                                    hiredEmployees.map(({ employees, status_date }, index) => (
                                        <CardUser key={index} name={employees.full_name} date={status_date} avatar={null} />
                                    ))
                                )}
                            </Flex>
                        </Box>


                    </SimpleGrid>
                </Container>
            </Flex>
        </Flex >
    )

}


export default dashboard;