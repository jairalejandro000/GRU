import React, { useState } from "react";
import {Navigate, useNavigate} from 'react-router-dom';

import './../../styles.css';

export default function Sigup(){
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const database = [
        {
            username: 'jairalejandro32@outlook.com',
            password: "12ab34cd"
        },
        {
            username: '19170146@uttcampus.edu.mx',
            password: 'canalitoscanalitos'
        }
    ];
    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        var { uname, pass } = document.forms[0];
        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            }else {
                setIsSubmitted(true);
            }
        }else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
        );
    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Nombre de usuario</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Correo electrónico</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Contraseña</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Repetir contraseña</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="button-container">
                    <input type="submit" value="Registrarse"/>
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="signup-form">
                <div className="title">REGISTRO</div>
                {isSubmitted ? <Navigate to="/" /> : renderForm}
                <p onClick={() => navigate.push('/')}>¿Ya tienes cuenta Inicia sesión ahora?</p>
            </div>
        </div>
    );
}