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

    if (localStorage.getItem('userId') !== null) { 
        return (
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <p className="navbar-brand" style={{ paddingLeft: '1%'}} >Welcome {localStorage.getItem('name')}</p>
                <button type="button" className="btn btn-info" onClick={()=>navigate('home')}>Home</button>
                <button type="button" className="btn btn-outline-light" style={{ paddingRight: '1%'}} onClick={logOut}>LogOut</button>            
            </nav>
        );
    }
};

export default Header;
