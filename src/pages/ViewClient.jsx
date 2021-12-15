import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner.jsx"

export const ViewClient = () => {

    const params = useParams();
    const {id} = params;

    const [client, setClient] = useState({})
    const [loading, toggleLoading] = useState(true);

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
        loading ? <Spinner /> : Object.keys(client).length === 0 ? <p>There are no results </p> : 
        (
            <div>
                <Fragment>
                        <div>
                        <h1 className = "font-black text-3xl text-blue-900">Your Client: {client.name}</h1>
                        <p className = "mt-3">Howdy! This is your client's info...</p>
                        <hr className = "border-b my-3"/>

                        <p 
                            className = "text-gray-500 text-2xl my-2">
                            <span 
                                className = "text-gray-800 uppercase font-bold"> Company Name:
                            </span> {client.company}
                        </p>

                        <p 
                            className = "text-gray-500 text-2xl my-2">
                            <span 
                                className = "text-gray-800 uppercase font-bold"> Email:
                            </span> {client.email}
                        </p>

                        {client.telephone ? 
                            <p 
                                className = "text-gray-500 text-2xl my-2">
                                <span 
                                    className = "text-gray-800 uppercase font-bold"> Phone Number:
                                </span> {client.telephone}
                            </p>
                        : null}

                        {client.clientNotes ? 
                            <p 
                                className = "text-gray-500 text-2xl my-2">
                                <span 
                                    className = "text-gray-800 uppercase font-bold"> Notes:
                                </span> {client.clientNotes}
                            </p>
                        : null}
                    </div>
                </Fragment>
            </div>
        )
    )}
