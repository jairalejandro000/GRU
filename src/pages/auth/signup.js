import React, { useRef }  from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password'; 

import './../../styles.css';

export default function Sigup(){
    const myToast = useRef(null);
    const showToast = (severityValue, summaryValue, detailValue) => {   
        myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue});   
    }
    const navigate = useNavigate();
    React.useEffect(() => {
        if (localStorage.getItem('token') != null) {
            navigate('/panel/panel');
          }
    });
    const [values, setValues] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    function handleSubmit(event){
        event.preventDefault();
        console.log(values);
        axios.post(`http://104.131.16.194/api/auth/signup`, values)
          .then(res => {
            console.log("ress", res);
            if(res.data.msg === "Hecho!"){
                showToast('success','Success Message','SignUp successful.');
                delay(2000).then(() => navigate('/auth/login'));
            }else{
                showToast('error','Error','Check your credentials.');   
            }
          })
    };
    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
          ...values,
          [name]: value,
        };
        setValues(newValues);
      }
    // JSX code for login form
    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Nombre</label>
                    <InputText type="text" name="username" onChange={handleChange} required />
                </div>
                <div className="input-container">
                    <label>Correo electrónico</label>
                    <InputText type="email" name="email" onChange={handleChange} required/>
                </div>
                <div className="input-container">
                    <label>Contraseña</label>
                    <Password  name="password" onChange={handleChange} required toggleMask /> 
                </div>
                <div className="button-container">
                    <input type="submit" value="Registrarse"/>
                </div>
            </form>
        </div>
    );
    return (
        <div className="app">
            <Toast ref={myToast}/>
            <div className="signup-form">
                <div className="title">REGISTRO</div>
                {renderForm}
                <p>¿Ya tienes cuenta? <NavLink to='/auth/login'>Inicia sesión ahora</NavLink></p>
            </div>
        </div>
    );
}