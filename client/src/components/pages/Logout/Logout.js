import { API_URL } from "../../../config";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../Redux/usersReducer';
import { Navigate } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const options = {
            method: 'DELETE',
        };
    
        fetch(`${API_URL}/auth/logout`, options)
        .then(()=>{
            dispatch(logOut());
        })
    
    }, [dispatch]);

 
    return <Navigate to="/" />;
}

export default Logout;