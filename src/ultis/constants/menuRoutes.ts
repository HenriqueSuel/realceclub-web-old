import { CalendarIcon } from "@chakra-ui/icons"
import { FaCalendar, FaUser } from "react-icons/fa"

const ROUTES = [
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

const ROUTES_SLIDE_BAR = [
    {
        name: 'Funcionarios',
        icon: FaUser,
        route: '/dashboard',
        rules: ['company'],
    },
    {
        name: 'Agendamento',
        icon: FaCalendar,
        route: '/dashboard/',
        rules: ['company'],
    }
]

const ROUTES_PROFILE = [
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

export {ROUTES, ROUTES_SLIDE_BAR, ROUTES_PROFILE}