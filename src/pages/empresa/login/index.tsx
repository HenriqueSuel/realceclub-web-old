
import { Flex, Button, Stack, Text, Link } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/Input';
import { postApiNotAuthentication } from '../../../services/apiNotAuthentication';
import { useRouter } from 'next/dist/client/router';

type SignInFormData = {
    email: string;
    password: string;
};

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
})


const LoginCompany = () => {
    const router = useRouter();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })

    const { errors } = formState

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        try {
            const resp = await postApiNotAuthentication('/company/login', values);
            console.log(resp);
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center"
            flexDirection="column"
        >
            <Flex
                paddingTop="8"
                paddingBottom="8"
            >
                <Text
                    fontSize="6xl">Realceclub Empresa</Text>
            </Flex>
            <Flex
                as="form"
                width="100%"
                maxWidth={360}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}
            >

                <Stack spacing="4">
                    <Input
                        name="email"
                        type="email"
                        label="E-mail"
                        error={errors.email}
                        {...register('email')}
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Senha"
                        error={errors.password}
                        {...register('password')}
                    />
                </Stack>

                <Button
                    type="submit"
                    mt="6"
                    colorScheme="pink"
                    size="lg"
                    isLoading={formState.isSubmitting}
                >
                    Entrar
                </Button>
                <Link paddingTop="8" textAlign="center" onClick={() => router.push('cadastro')} isExternal>
                    Criar Conta
                </Link>

            </Flex>
        </Flex>
    )
}

export default LoginCompany;