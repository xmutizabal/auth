"use client"

import axios, {AxiosError} from "axios"
import { FormEvent } from "react"

function RegisterPage() {

const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{


  e.preventDefault()


  const formData = new FormData(e.currentTarget)

  try {
    const res = await axios.post('/api/auth/signup', {
      email: formData.get('email'),
      password: formData.get('password'),
      fullname: formData.get('fullname')
      })
    console.log(res)
  } catch (error) { 
      console.log(error)
      if(error instanceof AxiosError){
        console.log(error.response?.data.message);
      }
  }


}
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
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