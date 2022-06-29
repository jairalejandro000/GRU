import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { alertService } from '../../_services/alert.service';

import "./../../styles.css";


export default function Login(){
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') != null) {
            navigate('/panel/panel');
          }
    });
    //const [errorMessages] = useState({});
    //const [isSubmitted, setIsSubmitted] = useState(false);
    const [values, setValues] = React.useState({
        email: "",
        password: ""
      });
      function handleSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        axios.post(`http://127.0.0.1:8000/api/auth/login`, values)
        .then(res => {
            console.log('resssss',res);
            if(res.data.msg === "Hecho!"){
                var token = encodeURI(res.data.data.token);
                var role = btoa(res.data.data.user.role.name);
                localStorage.setItem('token', token);
                localStorage.setItem('user', role); 
                //a.login();
                navigate('/panel/panel');
            }
          }, (error) => {
            alertService.info('Algo ha salido mal',{ autoClose: true, keepAfterRouteChange: true });
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