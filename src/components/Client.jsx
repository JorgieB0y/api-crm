import React from 'react'
import { useNavigate } from "react-router-dom"

export const Client = ({client, handleDelete}) => {

    const {name, email, company, telephone, id} = client;

    const navigate = useNavigate();

    return (
        <tr className = 'border-b hover:bg-gray-50'>
            <td className = "p-3" >{name}</td>
            <td className = "p-3" >
                <p><span className = 'text-gray-800 font-bold'>Email:</span> {email}</p>    
                {telephone ? <p><span className = 'text-gray-800 font-bold'>Tel:</span> {telephone}</p> : null}    
            </td>
            <td className = "p-3" >{company}</td>
            <td>
                <button 
                    className = 'bg-yellow-600 hover:bg-yellow-700 block w-4/5 text-white font-bold p-2 mt-2 text-xs uppercase' 
                    type = 'button'
                    onClick = {() => navigate(`clients/${id}`)} > Open
                </button>

                <button 
                    className = 'bg-blue-600 hover:bg-blue-700 block w-4/5 text-white font-bold p-2 mt-2 text-xs uppercase' 
                    type = 'button'
                    onClick = {() => navigate(`clients/edit/${id}`)} > Edit
                </button>

                <button 
                    className = 'bg-red-600 hover:bg-red-700 block w-4/5 text-white font-bold p-2 my-2 text-xs uppercase' 
                    type = 'button'
                    onClick = {() => handleDelete(name, id)}
                    > Delete
                </button>
            </td>
        </tr>
    )
}
