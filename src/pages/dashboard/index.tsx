import { Avatar } from "@chakra-ui/avatar";
import { Button, IconButton } from "@chakra-ui/button";
import { Box, Flex, Text, HStack, SimpleGrid, GridItem, Container } from "@chakra-ui/layout";
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
import { useState } from "react";


const ROUTES = [
    {
        name: 'Funcionário',
        route: '/dashboard',
        isActive: false
    },
    {
        name: 'Relatorio',
        route: '/relatorio',
        isActive: false
    }
]

const searchFormSchema = yup.object().shape({
    cpf: yup.string().required('CPF é obrigatio'),
})

const dashboard = () => {

    const [employeesFound, setEmployeesFound] = useState(null)

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
            setAlert({ message: 'Convite realiado com sucesso', color: 'success' });;
            setEmployeesFound(null);
        } catch (error) {
            setAlert({ message: error.message, color: 'error' });
        }
    }

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
                                <CardUser name="Henrique Suel" date="27/05/2021" avatar={null} />
                            </Flex>
                        </Box>
                        <Box>
                            <Text color="gray.900" fontSize="3xl">Funcionarios</Text>

                            <Flex boxShadow="base" pt="2" pl="6" direction="column" >
                                <CardUser name="Henrique Suel" date="27/05/2021" avatar={null} />
                            </Flex>
                        </Box>


                    </SimpleGrid>
                </Container>
            </Flex>
        </Flex >
    )

}

export default dashboard;