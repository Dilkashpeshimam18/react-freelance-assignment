import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

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
