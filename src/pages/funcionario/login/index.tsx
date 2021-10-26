
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

const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
})


const LoginEmployees = () => {
    const router = useRouter();
    const { signIn } = useContext(AuthContext);

    const { setAlert } = useAlert();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })

    const { errors } = formState

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        try {
            const resp = await postApiNotAuthentication('/employees/login', values);
            signIn(resp as any, 'employees')
        } catch (err) {
            setAlert({ message: err.message, color: 'error' });
        }

    }

    return (
        <LayoutCardImage
            direction="row"
            img="/images/background-login-employees.png"
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

export default LoginEmployees;