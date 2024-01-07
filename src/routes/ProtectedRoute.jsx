import React from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isLoading, user } = useUserAuth();

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(!user) {
        return <Navigate to='/login' />
    }

  return children
}

export default ProtectedRoute
