import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Navigate } from 'react-router-dom';

//high order component for authenticated routes
const isAuth = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
        const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

        if (isAuthenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <Navigate to="/login" />;
        }
    };
};

export default isAuth;
