import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import CallToActionWithIllustration from '../components/Home/Hero';
import WithSubnavigation from '../components/NavBar';
export default function Home() {

  const router = useRouter();

  return (
    <>
      <WithSubnavigation></WithSubnavigation>

      <Flex bgColor="rgb(247, 249, 252)">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'gray.400'}
          onClick={() => router.push('funcionario/login')}
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
          onClick={() => router.push('empresa/login')}
          _hover={{
            bg: 'pink.300',
          }}>
          Empresa
        </Button>
        <CallToActionWithIllustration></CallToActionWithIllustration>
      </Flex>
    </>
  )
}
