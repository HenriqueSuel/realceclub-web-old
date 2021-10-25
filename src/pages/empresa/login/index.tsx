
import { Flex, Button, Stack, Text, Link } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/Input';
import { postApiNotAuthentication } from '../../../services/apiNotAuthentication';
import { useRouter } from 'next/dist/client/router';
import { useAlert } from '../../../contexts/AlertContext';
import LayoutCardImage from '../../../components/LayoutCardImage';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

type SignInFormData = {
    email: string;
    password: string;
};

type User = {
    email: string;
    cnpj: string;
    owner_name: string;
    phone: string;
};

type SingIn = {
    company: User,
    token: string;
}


const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
})


const LoginCompany = () => {
    const router = useRouter();
    const { setAlert } = useAlert()
    const { signIn } = useContext(AuthContext);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })

    const { errors } = formState

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        try {
            const resp = await postApiNotAuthentication<SingIn>('/company/login', values);
            signIn(resp, 'company');
        } catch (err) {
            setAlert({ message: err.message, color: 'error' });
        }

    }

    return (
        <LayoutCardImage
            direction="row"
            img="/images/background-login.png"
            altImg="foto de dois moletos">

            <Flex
                display="flex"
                justifyContent="center"
                alignSelf="center"
                as="form"
                w="100%"
                onSubmit={handleSubmit(handleSignIn)}
            >

                <Stack spacing="4" width="18rem">
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

                    <Button
                        type="submit"
                        mt="6"
                        bg="black"
                        color="white"
                        size="lg"
                        _hover={{ bg: 'yellow', color: 'black' }}
                        _active={{ bg: 'yellow', color: 'black' }}
                        isLoading={formState.isSubmitting}
                    >
                        Entrar
                    </Button>
                    <Link paddingTop="8" color="blue" textAlign="center" onClick={() => router.push('cadastro')} isExternal>
                        Criar Conta
                    </Link>
                </Stack>


            </Flex>

        </LayoutCardImage>

    )
}

export default LoginCompany;