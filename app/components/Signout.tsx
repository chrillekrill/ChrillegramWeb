"use client"
import { signOut } from "next-auth/react";
//import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies"

type Props = {
    className?: string,
    callbackUrl?: string,
}



const Logout = (props: Props) => {
    const cookieStore = useCookies()
    const onButtonClick = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        cookieStore.remove('jwt')

        await signOut({
            callbackUrl: props.callbackUrl ?? "http://localhost:3000"
        })
    }

    return (
        <form onSubmit={onButtonClick}>
            <div>
            <button type="submit">
                Sign out
            </button>
        </div>
        </form>
    )
}

export default Logout