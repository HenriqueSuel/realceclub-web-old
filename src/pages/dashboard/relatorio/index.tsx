import { Box, Flex, Text, SimpleGrid, GridItem, Container } from "@chakra-ui/layout";
import SideBar from "../../../components/SideBar";
import CardRoutes from "../../../components/CardRoutes";

const ROUTES = [
    {
        name: 'Funcionário',
        route: '/dashboard',
        isActive: false,
        rules: ['company', 'employees']
    },
    {
        name: 'Relatorio',
        route: '/dashboard/relatorio',
        isActive: false,
        rules: ['company', 'employees']
    }
]

const employeeReport = () => {
    return (

        <Flex w="100%">
            <SideBar />

            <Flex direction="column" width="100%">
                <CardRoutes data={ROUTES} />

                <Container
                    marginTop="8"
                    maxW="container.xl">

                    <h1>EM CONSTRUÇÃO</h1>
                </Container>
            </Flex>
        </Flex>

    )
}
export default employeeReport;