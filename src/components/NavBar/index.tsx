import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    useColorModeValue,
    useBreakpointValue,
    Container
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

export default function WithSubnavigation() {

    const router = useRouter();
    
    return (
        <Box bg={useColorModeValue('white', 'gray.800')}>
            <Container maxW="container.xl">
                <Flex
                    color={useColorModeValue('gray.600', 'white')}
                    minH={'60px'}
                    py={{ base: 2 }}
                    px={{ base: 4 }}
                    borderBottom={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.900')}
                    align={'center'}>

                    <Flex flex={{ base: 1 }} justify={{ base: 'center' }}>
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}>
                            Realceclub
                        </Text>
                    </Flex>

                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'gray.400'}
                            onClick={()=> router.push('funcionario/login')}
                            _hover={{
                                bg: 'gray.300',
                            }}>
                            Funcionario
                        </Button>
                        <Button
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'pink.400'}
                            onClick={()=> router.push('empresa/login')}
                            _hover={{
                                bg: 'pink.300',
                            }}>
                            Empresa
                        </Button>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    );
}

interface NavItem {
    label: string;
    subLabel?: string;
    children?: Array<NavItem>;
    href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
];