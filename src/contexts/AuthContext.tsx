import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'
import { getAuth } from "../services/apiAuth";
import { validationRoutes } from "../ultis/validationRoutes";
import { useLoading } from "./LoadingContext";

type User = {
    cnpj?: string;
    email?: string;
    name_company?: string;
    owner_name?: string;
    phone?: string;
};

type SingIn = {
    employees?: User,
    company?: User,
    token: string;
}

type AuthContextData = {
    signIn: (data: SingIn, type: string) => void;
    signOut: () => void;
    setUser: (user) => void;
    user: User;
    isAuthenticated: boolean;
};

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

export function signOut() {
    const { 'nextauth.type': type } = parseCookies()
    destroyCookie(undefined, 'nextauth.token')
    destroyCookie(undefined, 'nextauth.type')

    authChannel.postMessage('signOut');

    const route = type === 'company' ? 'empresa' : 'funcionario';
    Router.push(`${route}/login`);
}

export function AuthProvider({ children }: AuthProviderProps) {
    const { setLoading } = useLoading();
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {
        authChannel = new BroadcastChannel('auth')

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    break;
                default:
                    break;
            }
        }
    }, [])


    function signIn(data: SingIn, type: string) {
        setCookie(undefined, 'nextauth.type', type, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
        })
        setCookie(undefined, 'nextauth.token', data.token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: '/'
        })

        setUser({
            ...data.company
        })

        const router = type === 'company' ? '/dashboard' : '/convites'

        Router.push(router);
    }


    useEffect(() => {
        const onMount = async () => {
            try {
                if(Router.asPath === '/') return
                setLoading(true);
                const { 'nextauth.token': token } = parseCookies();
                const { 'nextauth.type': type } = parseCookies();
                const verifyRoute = validationRoutes(Router.asPath, token?.length > 0, type)
                if (verifyRoute.haveRermission && verifyRoute.needToken) {
                    const resp = await getAuth<User>(`/${type}/me`);
                    setUser(resp)
                } else if (!verifyRoute.haveRermission) {
                    Router.push(verifyRoute.redirect);
                }
                setLoading(false);
            } catch (error) {
                const { 'nextauth.type': type } = parseCookies();
                const router = type === 'company' ? '/empresa/login' : '/funcionario/login'
                Router.push(router);
                setLoading(false);
            }

        }
        onMount();
    }, []);


    return (
        <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}