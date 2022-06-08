import React from "react";
import { useNavigate} from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const logOut = ()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigate('/');
    }

    return (
        <nav class="navbar navbar-dark bg-dark justify-content-between">
            <p class="navbar-brand" style={{ paddingLeft: '1%'}} >Welcome {localStorage.getItem('name')}</p>
            <button class="btn btn-info" type="button">Home</button>
            <button type="button" class="btn btn-outline-light"style={{ paddingRight: '1%'}} onClick={logOut}>LogOut</button>            
        </nav>
    );
};

export default Header;
