import { CalendarIcon } from "@chakra-ui/icons"
import { FaCalendar, FaUser } from "react-icons/fa"
import { IconType } from "react-icons/lib"


type Routes = {
    name: string;
    route: string;
    rules: string[];
    icon?: IconType;
    isActive?: boolean;
}

const ROUTES_PUBLIC :Routes[] = [
    {
        name: 'teste',
        route: '/teste',
        rules: [],
        isActive: false
    },
    {
        name: 'login',
        route: '/funcionario/login',
        rules: [],
        isActive: false
    },
    {
        name: 'login',
        route: '/empresa/login',
        rules: [],
        isActive: false
    },
    {
        name: 'cadastro',
        route: '/funcionario/cadastro',
        rules: [],
        isActive: false
    },
    {
        name: 'cadastro',
        route: '/empresa/cadastro',
        rules: [],
        isActive: false
    },

]

const ROUTES: Routes[] = [
    {
        name: 'Funcionário',
        route: '/dashboard',
        rules: ['company', 'employees'],
        isActive: false
    },
    {
        name: 'Relatorio',
        route: 'dashboard/relatorio',
        rules: ['company', 'employees'],
        isActive: false
    }
]

const ROUTES_SLIDE_BAR: Routes[] = [
    {
        name: 'Funcionarios',
        icon: FaUser,
        route: '/dashboard',
        rules: ['company'],
    },
    {
        name: 'Agendamento',
        icon: FaCalendar,
        route: '/teste/',
        rules: ['company'],
    }
]

const ROUTES_PROFILE: Routes[] = [
    {
        name: 'Perfil',
        route: '/perfil',
        rules: ['company'],
        isActive: false
    },
    {
        name: 'Convites',
        route: '/convites',
        rules: ['employees'],
        isActive: false
    },
    {
        name: 'Horario de atendimento',
        route: '/horario-atendimento',
        rules: ['company', 'employees'],
        isActive: false
    },
    {
        name: 'Historico',
        route: '/historico',
        rules: ['company', 'employees'],
        isActive: false
    },
]

const ALL_ROUTES = {
    ROUTES: ROUTES.concat(ROUTES_SLIDE_BAR, ROUTES_PROFILE)
}

export {ROUTES, ROUTES_SLIDE_BAR, ROUTES_PROFILE, ROUTES_PUBLIC, ALL_ROUTES}