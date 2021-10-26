import { Avatar } from "@chakra-ui/avatar";
import { Flex, Text } from "@chakra-ui/layout";

interface IPropsCardUser {
    avatar: string;
    name: string;
    date?: string;
    email?: string;
    children?: React.ReactNode
}

const CardUser = ({ avatar, name, date, email, children }: IPropsCardUser) => {
    return (
        <Flex pt="2" pb="2" alignItems="center">
            <Avatar name={name} src={avatar} />

            <Flex
                m="2"
                direction="column"
            >
                <Text fontSize="md">{name}</Text>
                <Text fontSize="sm" color="gray.100">{date || email}</Text>
            </Flex>

            {children}
        </Flex>
    )
}

export default CardUser;