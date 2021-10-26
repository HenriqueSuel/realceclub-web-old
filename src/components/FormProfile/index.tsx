import { Flex, SimpleGrid } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Input } from "../Input";
import * as yup from 'yup';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { patchAuth, postAuth } from "../../services/apiAuth";
import { useAlert } from "../../contexts/AlertContext";
import { Button } from "@chakra-ui/button";

type User = {
    cnpj: string;
    email: string;
    name_company: string;
    phone: string;
    owner_name: string;
};

const updateFormSchema = yup.object().shape({
    cnpj: yup.string().required('CNPJ é obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    name_company: yup.string().required('Nome da empresa é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    owner_name: yup.string().required('Nome é obrigatório'),
})

const FormProfile = () => {
    const { user, setUser } = useContext(AuthContext)
    const { setAlert } = useAlert();

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: yupResolver(updateFormSchema)
    })

    const { errors } = formState

    const handleUpdate: SubmitHandler<User> = async (values) => {
        try {
            const resp = await patchAuth<User>('/company', values);
            setUser({ ...resp })
            setUserInfo();
            setAlert({ message: 'Perfil atualizado com sucesso!', color: 'success' });
        } catch (err) {
            setAlert({ message: err.message, color: 'error' });
        }
    }

    const setUserInfo = () => {
        setValue('email', user.email);
        setValue('cnpj', user.cnpj);
        setValue('phone', user.phone);
        setValue('owner_name', user.owner_name);
        setValue('name_company', user.name_company);
    }

    useEffect(() => {
        if (user) setUserInfo();
    }, [user])

    return (
        <Flex
            display="flex"
            justifyContent="center"
            alignSelf="center"
            as="form"
            w="100%"
            onSubmit={handleSubmit(handleUpdate)}
        >
            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} w="100%" spacing="40px">
                <Input
                    name="email"
                    type="email"
                    label="E-mail"
                    error={errors.email}
                    isDisabled
                    {...register('email')}
                />
                <Input
                    name="cnpj"
                    type="text"
                    label="CNPJ"
                    error={errors.cnpj}
                    isDisabled
                    {...register('cnpj')}
                />
                <Input
                    name="phone"
                    type="text"
                    label="Telefone"
                    error={errors.phone}
                    isDisabled
                    {...register('phone')}
                />
                <Input
                    name="owner_name"
                    type="text"
                    label="Nome do proprietario"
                    error={errors.owner_name}
                    {...register('owner_name')}
                />
                <Input
                    name="name_company"
                    type="text"
                    label="Nome da Empresa"
                    error={errors.name_company}
                    {...register('name_company')}
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
                    Salvar
                </Button>
            </SimpleGrid>
        </Flex>
    )
}

export default FormProfile;