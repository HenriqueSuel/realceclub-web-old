import { Flex } from '@chakra-ui/layout';
import CallToActionWithIllustration from '../components/Home/Hero';
import WithSubnavigation from '../components/NavBar';
export default function Home() {
  

  return (
    <>
    <WithSubnavigation></WithSubnavigation>

    <Flex bgColor="rgb(247, 249, 252)">

    <CallToActionWithIllustration></CallToActionWithIllustration>
    </Flex>
    </>
  )
}
