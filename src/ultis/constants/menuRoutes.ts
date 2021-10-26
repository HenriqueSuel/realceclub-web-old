import { CalendarIcon } from "@chakra-ui/icons"
import { FaCalendar, FaUser } from "react-icons/fa"

const ROUTES = [
    {
        name: 'Funcionário',
        route: '/dashboard',
        isActive: false
    },
    {
        name: 'Relatorio',
        route: 'dashboard/relatorio',
        isActive: false
    }
]

const ROUTES_SLIDE_BAR = [
    {
        name: 'Funcionarios',
        icon: FaUser,
        route: '/dashboard'
    },
    {
        name: 'Agendamento',
        icon: FaCalendar,
        route: '/agendamento'
    }
]

export {ROUTES, ROUTES_SLIDE_BAR}