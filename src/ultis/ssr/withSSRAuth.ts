import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { getAuth } from "../../services/apiAuth";
import { validateUserPermissions } from "../validateUserPermissions";
/* import { validateUserPermissions } from "./validateUserPermissions"; */

type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
}


type User = {
    email: string;
    phone: string;
    cnpj?: string;
    cpf?: string;
    name_company?: string;
    full_name?: string;
};

type SingIn = {
    employees?: User,
    company?: User,
    token: string;
}

export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];
    const type = cookies['nextauth.type'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    /* Verificar se o token é valido */
    getAuth<SingIn>(`${type}/me`)
        .then(response => {
            const userHasValidPermissions = validateUserPermissions({
                type
              })
        
              if (!userHasValidPermissions) {
                return {
                  redirect: {
                    destination: '/dashboard',
                    permanent: false,
                  }
                }
              }
    })
    .catch(() => {
        return {
            redirect: {
              destination: '/',
              permanent: false,
            }
          }
    })

  }
}