import axios from 'axios';
import { cookies } from 'next/headers'
import type { NextAuthOptions } from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "text",
                    placeholder: "Your email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                
                type userReturn = {
                    id: string,
                    name: string
                }
                const user : userReturn = {
                    id: '',
                    name: ''
                }

                await axios.post('https://localhost:7135/User/Authenticate',{ email: credentials?.username, password: credentials?.password }, {
                    httpsAgent: new (require('https').Agent)({
                    rejectUnauthorized: false,
                    }),
                })
                .then((res: any) => {
                    if(res.status != 200) {
                        console.log("help")
                        throw new Error(`HTTP error! Status: ${res.status}`)
                        
                    } else {    
                        user.id = res.data.auth.id
                        user.name = res.data.auth.email
                        const cookieStore = cookies()
                        const hasCookie = cookieStore.has('jwt')
                        if(!hasCookie) {
                            cookies().set('jwt', res.data.jwt)
                        }
                    }
                })

                if(user.id.length > 0) {
                    return user
                }

                return null           
            }
        })
    ],
    pages: {
        signIn: "/signin",
    },
}