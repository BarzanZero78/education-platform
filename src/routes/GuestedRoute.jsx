import React from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import { Navigate } from 'react-router-dom';

const GuestedRoute = ({ children }) => {
    const { isLoading, user } = useUserAuth();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(user) {
        return <Navigate to='/' />
    }

  return children
}

export default GuestedRoute
