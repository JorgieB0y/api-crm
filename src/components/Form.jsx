import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from "yup";
import { Alert } from './Alert';
import { useNavigate } from "react-router-dom"

export const ClientForm = ({client}) => {

    const navigate = useNavigate()

    const newClientSchema = Yup.object().shape({
        name: Yup.string().min(3, "Please input a valid name").required("Name of client? is required"),
        company: Yup.string().required("Client's company name is required"),
        email: Yup.string().email().max(225, "Must be valid E-mail address").required(),
        telephone: Yup.number().typeError("Must be a valid phone number"),
    });

    const handleSubmit = async (values) => {
        try {
            if (client.id) {
                // Edit client if Client object has an ID
                const url = `http://localhost:4000/clients/${client.id}`

                let response = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const result = await response.json()

            } else {
                // If client ID is empty Form will add a new entry to the database
                const url = "http://localhost:4000/clients"

                let response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                await response.json()
            }

        } catch (error) {
            console.log(`There was an error handling the submit. ${error}`);
        }
    }

    return (
        <div className = "bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className = "text-gray-300 font-bold text-xl uppercase text-center">{client.name === "" ? "Add Client" : `Edit ${client.name}'s Information`}</h1>

            <Formik
                initialValues = {{
                    name: client?.name ?? "",
                    company: client?.company ?? "",
                    email: client?.email ?? "",
                    telephone: client?.telephone ?? "",
                    clientNotes: client?.clientNotes ?? ""
                }}

                enableReinitialize = {true}

                onSubmit = {(values, {resetForm}) => {
                    handleSubmit(values)

                    resetForm();
                    navigate("/clients")
                }}

                validationSchema = {newClientSchema}
            >
                {({errors, touched}) => (

                    <Form
                        className = "mt-10"
                    >
                        <div className = "mb-4">
                            <label
                                className = "text-gray-800"
                                htmlFor = "name"
                            >Name:</label>
                            <Field 
                                id = "name"
                                name = "name"
                                className = "block mt-2 w-full p-3 bg-gray-50 rounded-sm"
                                type = "text"
                                placeholder = "Elon Musk"
                            />

                            {errors.name && touched.name ? 
                                <Alert>{errors.name}</Alert>
                            : null }
                        </div>

                        <div className = "mb-4">
                            <label
                                className = "text-gray-800"
                                htmlFor = "company"
                            >Company Name:</label>
                            <Field 
                                id = "company"
                                name = "company"
                                className = "block mt-2 w-full p-3 bg-gray-50 rounded-sm"
                                type = "text"
                                placeholder = "Tesla"
                            />

                            {errors.company && touched.company ? 
                                <Alert>{errors.company}</Alert>
                            : null }
                        </div>
                        
                        <div className = "mb-4">
                            <label
                                className = "text-gray-800"
                                htmlFor = "email"
                            >E-Mail:</label>
                            <Field 
                                id = "email"
                                name = "email"
                                className = "block mt-2 w-full p-3 bg-gray-50 rounded-sm"
                                type = "email"
                                placeholder = "elon@tesla.com"
                            />

                            {errors.email && touched.email ? 
                                <Alert>{errors.email}</Alert>
                            : null }
                        </div>

                        <div className = "mb-4">
                            <label
                                className = "text-gray-800"
                                htmlFor = "telephone"
                            >Phone Number:</label>
                            <Field 
                                id = "telephone"
                                name = "telephone"
                                className = "block mt-2 w-full p-3 bg-gray-50 rounded-sm"
                                type = "tel"
                                placeholder = "+1 415 333 1234"
                            />

                            {errors.telephone && touched.telephone ? 
                                <Alert>{errors.telephone}</Alert>
                            : null }
                        </div>

                        <div className = "mb-4">
                            <label
                                className = "text-gray-800"
                                htmlFor = "client?-notes"
                            >Client Notes:</label>
                            <Field 
                                as = "textarea"
                                id = "client?-notes"
                                name = "clientNotes"
                                className = "block mt-2 w-full p-3 bg-gray-50 rounded-sm h-40"
                                type = "text"
                            />
                        </div>

                        <input 
                            className = "mt-5 bg-blue-500 w-full block p-3 rounded-sm text-white uppercase font-bold text-lg"
                            type = "submit"
                            value = {client.name === "" ? "Add Client" : `Submit Changes`}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

ClientForm.defaultProps = {
    client: {
        name: ""
    }
}
