import { ALL_ROUTES, ROUTES_PUBLIC } from "./constants/menuRoutes"


const validationRoutes = (routeActive: string, isAuth:boolean, type: string) => {
        if(!isAuth) {
            
            return {
                haveRermission: ROUTES_PUBLIC.some(route => routeActive === route.route),
                redirect: redict(!isAuth, type),
                needToken: false
            }
        } else {
            return {
                haveRermission: ALL_ROUTES.ROUTES.some(route => routeActive === route.route),
                redirect: redict(!isAuth, type),
                needToken: true
            }
        }
}

const redict = (isAuth: boolean, type: string): string => {
        if(isAuth) {
            const router = type === 'company' ? '/empresa/login' : '/funcionario/login'
            return  router
        } else {
            const router = type === 'company' ? '/dashboard' : 'convites'
            return  router
        }

}


export {validationRoutes}