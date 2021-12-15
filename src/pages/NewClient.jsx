import React from 'react'
import { ClientForm } from '../components/Form'

export const NewClient = () => {
    return (
        <>
            <h1 className = "font-black text-3xl text-blue-900">New Client</h1>
            <p className = "mt-3">Fill all the information to add a new client</p>

            <ClientForm />
        </>
    )
}
