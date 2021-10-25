import { Flex, Button, Stack, Text, Link, Image, Box } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../components/Input';
import { postApiNotAuthentication } from '../../../services/apiNotAuthentication';
import { useRouter } from 'next/dist/client/router';
import { useAlert } from '../../../contexts/AlertContext';
import LayoutCardImage from '../../../components/LayoutCardImage';
import { AuthContext } from '../../../contexts/AuthContext';
import { useContext } from 'react';


type ISignUpFormData = {
    cnpj: string;
    email: string;
    password: string;
    name_company: string;
    owner_name: string;
    phone: string;
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

const signUpFormSchema = yup.object().shape({
    cnpj: yup.string().required('CNPJ é obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória'),
    phone: yup.string().required('Telefone é obrigatório'),
})


const signUpCompany = () => {
    const router = useRouter();
    const { signIn } = useContext(AuthContext);
    const { setAlert } = useAlert();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpFormSchema)
    })

    const { errors } = formState

    const handleSignUp: SubmitHandler<ISignUpFormData> = async (values) => {
        try {
            const resp = await postApiNotAuthentication<SingIn>('/company', values);
            signIn(resp, 'company');
        } catch (err) {
            setAlert({ message: err.message, color: 'error' });
        }
    }

    return (
        <LayoutCardImage
            direction="row-reverse"
            img="/images/background-login.png"
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
                        name="cnpj"
                        type="text"
                        label="CNPJ"
                        error={errors.cnpj}
                        mask="99.999.999/9999-99"
                        {...register('cnpj')}
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
                        bg="black"
                        color="white"
                        size="lg"
                        _hover={{ bg: 'yellow', color: 'black' }}
                        _active={{ bg: 'yellow', color: 'black' }}
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


export default signUpCompany;