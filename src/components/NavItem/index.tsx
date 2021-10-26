import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

const NavItem = ({ icon, title, navSize, route}) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(router.pathname === route);
    },[])

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    borderRadius={8}
                    w={navSize == "large" && "100%"}
                    onClick={() => router.push(route)}
                >
                    <MenuButton w="100%">
                        <Flex >
                            <Icon as={icon} fontSize="1.5rem" color={isActive && "yellow" || "gray.300"}  />
                            <Text ml={5} color={isActive && "yellow" || "gray.300" } display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}

export default NavItem;