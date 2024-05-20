"use client"
import { useSession } from "next-auth/react"

function DasboardPage() {
    
    const {data: session, status} = useSession()
    
    console.log(session,status)

    return (
        <div>DasboardPage</div>
    )
}

export default DasboardPage