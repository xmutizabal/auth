"use client"

import axios, {AxiosError} from "axios"
import { FormEvent, useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function RegisterPage() {
  const [error, setError]= useState()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()


    const formData = new FormData(e.currentTarget)

    try {
      const signUpResponse = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname')
        })
      const res = await signIn ('credentials', {
        email: signUpResponse.data.email,
        password: formData.get("password"),
        redirect: false,
        })

      if(res?.ok) return router.push("/dashboard/profile")

    } catch (error) { 
        console.log(error)
        if(error instanceof AxiosError){
          setError(error.response?.data.message)
        }
    }


  }
    return (
      <div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-500 text-white p-2 mb-2"> {error} </div>}
          <h1>Registro</h1>
          <input type="text" placeholder="Nombre" name="fullname" className="bg-zinc-800 px-4 py-2 block mb-2"/>
          <input type="text" placeholder="Email" name="email" className="bg-zinc-800 px-4 py-2 block mb-2" />
          <input type="text" placeholder="*****" name="password" className="bg-zinc-800 px-4 py-2 block mb-2" />
            <button className="bg-indigo-500 px-4 py-2 rounded-full">Registrarse</button>
        </form>

      </div>
    )
  }

export default RegisterPage