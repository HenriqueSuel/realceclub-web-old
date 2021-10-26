import { Container, Flex } from "@chakra-ui/layout";
import CardRoutes from "../CardRoutes";
import SideBar from "../SideBar";

const Layout = ({ routesCard, children }) => {

    return (
        <Flex w="100%">
            <SideBar />
            <Flex direction="column" width="100%">
                <CardRoutes data={routesCard} />

                <Container
                    marginTop="8"
                    maxW="container.xl">
                    {children}
                </Container>
            </Flex>
        </Flex>
    )
}

export default Layout;