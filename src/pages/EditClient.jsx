import React, { useState, useEffect } from 'react'
import { ClientForm } from '../components/Form'
import { useParams } from "react-router-dom"

export const EditClient = () => {

    const [client, setClient] = useState({})
    const [loading, toggleLoading] = useState(true)

    const params = useParams();
    const {id} = params;

    useEffect(() => {
        const fetchClientAPI = async () => {
            try {
                const url = `http://localhost:4000/clients/${id}`;

                const response = await fetch(url)
                const result = await response.json();
                setClient(result);

            } catch (error) {
                console.log(`There was an error getting the client from db.json with id: ${id}. ${error} `)
            }
        }

        fetchClientAPI();
        toggleLoading(false);
    }, []);

    return (
        <>
            <h1 className = "font-black text-3xl text-blue-900">Edit Client</h1>
            <p className = "mt-3">Edit Client's information</p>

            {client.name ? 
                <ClientForm 
                    client = {client}
                /> 
                :
                <p className = 'text-2xl text-gray-800 font-bold uppercase'>Invalid client ID</p>
            }
            
        </>
    )
}
