"use client"

import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function LoginPage() {
  const [error, setError]= useState("")
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()


    const formData = new FormData(e.currentTarget)

    try {

      const res = await signIn ('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
        })

      if(res?.error) return setError(res.error as string)

      if(res?.ok) return router.push("/dashboard")

    } catch (error) { 
        console.log(error)
    }


  }
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2"> {error} </div>}
          <h1>Login</h1>
          <input type="text" placeholder="Email" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
          <input type="text" placeholder="*****" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
            <button className="bg-indigo-500 px-4 py-2 rounded-full">Entrar</button>
        </form>

      </div>
    )
  }

export default LoginPage