import React, { useState, useEffect } from 'react';
import { Client } from '../components/Client';
import Spinner from '../components/Spinner';

export const Start = () => {

    const [clients, setClients] = useState([]);
    const [loading, toggleLoading] = useState(true);

    useEffect(() => {
        const getClientsAPI = async () => {
            try {
                let url = "http://localhost:4000/clients"
                let response = await fetch(url)
                let result = await response.json()

                setClients(result)
                toggleLoading(false)
            } catch (error) {
                console.log(`There was an error fetching Clients from API. ${error}`)
            }
        }

        getClientsAPI();
    }, [])

    const handleDelete = async (name, id) => {
        const deleteConfirmation = confirm(`Are you sure you want to delete client: ${name}?`)

        if (deleteConfirmation) {
            try {
                const url = `http://localhost:4000/clients/${id}`

                const response = await fetch(url, {
                    method: "DELETE"
                })

                await response.json() /*
                If you aren't processing the result of the response, 
                just leave await instead of assigning it to a variable
                i.e: const result = await response.json()*/ 

                // Returns an array of every client that doesn't match the client id of the one I am deleting
                const clientArray = clients.filter( client => client.id !== id)

                // Use new array to set new client list
                setClients(clientArray)
            } catch (error) {
                console.log(`There was an error deleting this client with id: ${id}. ${error}`)
            }   
        }
    }

    return (
        <>
            <h1 className = "font-black text-3xl text-blue-900">Your Clients</h1>
            <p className = "mt-3">Howdy! These are your clients' info...</p>

            {clients.length === 0 ? <Spinner /> :
                <table className = 'w-full mt-5 table-auto shadow bg-white'>
                <thead className = 'bg-blue-800 text-white'>

                   <tr>
                       <th className = 'p-2'> Name </th>
                       <th className = 'p-2'> Contact </th>
                       <th className = 'p-2'> Company Name </th>
                       <th className = 'p-2'> Actions </th>
                   </tr>

                </thead>
 
                    <tbody>
                        {clients.map(client => (
                            <Client 
                                key = {client.id}
                                client = {client}
                                handleDelete = {handleDelete}
                            />
                        ))}
                    </tbody>
            </table>
            }
        </>
    )
}
