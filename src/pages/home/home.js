import React from "react";
import { useNavigate } from 'react-router-dom';

import "./../../styles.css";

export default function Home(){
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') != null) {
            navigate('/panel/panel');
          }
    });
    function login(){
        navigate('/auth/login');
    }
    function signup(){
        navigate('/auth/signup');
    }
    return ( 
        <div>
            <div className="button-container" style={{ marginTop: "5%", marginLeft: "80%", marginRight: "auto"}}>
                <input type="submit" style={{ fontSize: "20px"}} onClick={login} value="Iniciar Sesión" />
            </div>
            <div className="button-container" style={{ marginTop: "10%", marginLeft: "auto", marginRight: "auto"}}>
                <input type="submit" style={{ fontSize: "20px"}} onClick={signup} value="Registrarme" />
            </div>
        </div>
    );
}