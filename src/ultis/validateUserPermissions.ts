import { parseCookies } from "nookies";
import { getAuth } from "../services/apiAuth";

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
  
  const company = [
      '/dashboard',
      '/dashboard/relatorio',
  ];

  const employees = []

  
  
  export async function validateUserPermissions({ctx}) {
    const cookies = parseCookies(ctx);
    const token = cookies['nextauth.token'];
    const type = cookies['nextauth.type'];

    if (!token) {
        console.log('TOKEN')
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    try {
        const resp = await getAuth<SingIn>(`${type}/me`)
        let validation = false;
        if(type === 'company') {
            validation = company.some(router => router === ctx.ctx.resolvedUrl);
        } else {
            validation =  employees.some(router => router === ctx.ctx.resolvedUrl);
        }
        if (validation) {
            return { props: { data: null } }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
    } catch (error) {
        console.log('CATCH')
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
  }