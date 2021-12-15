import React from 'react'

export const Alert = ({children}) => {
    return (
        <div className = "bg-red-600 my-4 p-3 text-white font-bold uppercase text-center">
            {children} {/*Children is whatever is inside opening and closing tags when calling the component*/}
        </div>
    )
}
