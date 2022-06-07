import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';

import "./../../styles.css";


export default function Login(){
    const navigate = useNavigate();
    //const [errorMessages] = useState({});
    //const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues, setItem] = React.useState({
        email: "",
        password: ""
      });
      function handleSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        axios.post(`http://127.0.0.1:8000/api/auth/login`, values)
          .then(res => {
            console.log(res);
            if(res.data.status === true && res.data.msg === "Hecho!"){
                localStorage.setItem('token', res.data.data.token);
                navigate('/panel/panel')
            }
          })
          //setIsSubmitted(true);
      }
      function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
          ...values,
          [name]: value,
        };
        setValues(newValues);
      }
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Correo electrónico</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Contraseña</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <div className="button-container">
                    <input type="submit" value="Iniciar sesión"/>
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <div className="login-form">
                <div className="title">INICIO DE SESIÓN</div>
                {renderForm}
                <p>¿No tienes cuenta? <a href="/auth/signup">Regístrate ahora</a></p>
            </div>
        </div>
    );
}