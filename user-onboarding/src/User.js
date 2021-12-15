import React from 'react'

function User({ details }) {
    if (!details) {
        return <h3>working on getting user details...</h3>
    }

    return (
        <div>
            <h2>{details.first_name}</h2>
            <p>Email: {details.email}</p>
        </div>
    )
}

export default User