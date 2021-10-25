import { Flex, Image, Box } from '@chakra-ui/react';
import { SystemProps } from '@chakra-ui/styled-system';

interface IProps {
    img: string;
    altImg: string;
    direction: SystemProps["flexDirection"];
    children: React.ReactNode
}


const LayoutCardImage: React.FC<IProps> = ({ children, altImg, direction, img }) => {

    return (
        <Flex
            alignItems="stretch"
            minHeight="100vh"
            direction={direction}
        >

            <Image maxHeight="100vh" src={img} alt={altImg} display={{
                base: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block'
            }} />

            <Flex
                w="100%"
                direction="column"
                alignSelf="center"
            >
                <Box marginBottom="14">
                    <Image margin="auto" src="/images/RealceclubLogo 1.png" alt="logo realceclub" />
                </Box>

                {children}
            </Flex>


        </Flex>
    )
}

export default LayoutCardImage