import React, { useState } from "react";
import {Navigate } from 'react-router-dom';

import "./../../styles.css";

export default function Signup(){
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
                    <label>Name(s)</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Lastname</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Gender</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Correo</label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password</label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="signup-form">
                <div className="title">Sign Up</div>
                {isSubmitted ? <Navigate to="/" /> : renderForm}
            </div>
        </div>
    );
}