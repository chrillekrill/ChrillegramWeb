"use client"
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    className?: string,
    callbackUrl?: string,
}

const Login = (props:Props) => {
    const [userName, setUsername] = useState('')
    const [passWord, setPassword] = useState('')

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        await signIn("credentials", {
            username: userName,
            password: passWord,
            redirect:true,
            callbackUrl: props.callbackUrl ?? "http://localhost:3000"
        })
    }
  return (
    <div className={props.className}>
        <div className='g-gradient-to-b from-slate-50 to-slate-200 p-2 text-center text-slate-600'>Login Form</div>
        <form onSubmit={onSubmit} className='p-2 flex flex-col gap-3'>
            <label htmlFor="username">Email</label>
            <input 
                name="username"
                type="text"
                onChange={(e) => (setUsername(e.target.value))}
            />
            <label htmlFor="password">Password</label>
            <input 
                name="password"
                type="password"
                onChange={(e) => (setPassword(e.target.value))}
            />
            <div className='flex items-center justify-center mt-2 gap-2'>
                <button type="submit" className='w-28'>
                    Sign in
                </button>
                <Link
                    href={props.callbackUrl ?? "/"}
                    className='w-28 border border-red-600 text-center py-2 rounded-md text-red-600
                    transition hover:bg-red-600 hover:text-white hover:border-transparent active:scale-95'
                >
                    Cancel
                </Link>
            </div>
        </form>
    </div>
    
  )
}

export default Login