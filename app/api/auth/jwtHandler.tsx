import axios from 'axios';
import { cookies } from 'next/headers'

const uri : string = 'https://localhost:7135'
const jwt = cookies().get('jwt')?.value

export default async function getUsername(): Promise<string> {
    try {
        const res = await axios.post(`${uri}/User/GetUserNameFromJwt`,{jwt: jwt}, {
            httpsAgent: new (require('https').Agent)({
            rejectUnauthorized: false,
            })
        })

        const username : string = res.data

        return username
    } catch(err) {
        return ""
    }
}
