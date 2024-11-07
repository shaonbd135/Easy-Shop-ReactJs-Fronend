import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loggedInDataContext } from '../../RoutesIndex/RoutesIndex';

const PrivateRoutes = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useContext(loggedInDataContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        } else {
            localStorage.setItem('intendedPath', location.pathname);
            navigate('/login');
        }
        setIsUserLoaded(true);
    }, [setLoggedInUser, navigate, location.pathname]);

    if (!isUserLoaded) {

        return <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    return loggedInUser.email ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;

