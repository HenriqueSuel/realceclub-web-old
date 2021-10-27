import { Flex, Button, Stack, Text, Link, Image, Box } from '@chakra-ui/react';
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


type ISignUpFormData = {
    cpf: string;
    email: string;
    password: string;
    full_name: string;
    phone: string;
};

const signUpFormSchema = yup.object().shape({
    cpf: yup.string().required('CPF é obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
    phone: yup.string().required('Telefone é obrigatório'),
})

const signUpEmployees = () => {
    const router = useRouter();
    const { signIn } = useContext(AuthContext);
    const { setAlert } = useAlert();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpFormSchema)
    })

    const { errors } = formState

    const handleSignUp: SubmitHandler<ISignUpFormData> = async (values) => {
        try {
            const resp = await postApiNotAuthentication('/employees', values);
            signIn(resp, 'employees');
        } catch (err) {
            setAlert({ message: err.message, color: 'error' });
        }
    }

    return (
        <LayoutCardImage
            direction="row-reverse"
            img="/images/background-login-employees.png"
            altImg="foto de dois moletos">
            <Flex
                display="flex"
                justifyContent="center"
                alignSelf="center"
                as="form"
                w="100%"
                onSubmit={handleSubmit(handleSignUp)}
            >
                <Stack spacing="4" width="18rem">
                    <Input
                        name="cpf"
                        type="text"
                        label="CPF"
                        error={errors.cpf}
                        mask="999.999.999-99"
                        {...register('cpf')}
                    />
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
                    <Input
                        name="phone"
                        type="text"
                        label="Telefone"
                        error={errors.phone}
                        mask="(99) 9 9999-99999"
                        {...register('phone')}
                    />

                    <Button
                        type="submit"
                        mt="6"
                        bg="yellow"
                        size="lg"
                        isLoading={formState.isSubmitting}
                    >
                        Entrar
                    </Button>
                    <Link paddingTop="2" color="blue" textAlign="center" onClick={() => router.push('login')} isExternal>
                        Já tenho conta, fazer login
                    </Link>
                </Stack>
            </Flex>
        </LayoutCardImage>
    )
}


export default signUpEmployees;