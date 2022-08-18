import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

import './../../styles.css';


export default function Login(){
    const myToast = useRef(null);
    const showToast = (severityValue, summaryValue, detailValue) => {   
        myToast.current.show({severity: severityValue, summary: summaryValue, detail: detailValue, life: 1000});   
    }
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
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      function handleSubmit(evt) {
        evt.preventDefault();
        console.log(values);
        axios.post(`http://104.131.16.194/api/auth/login`, values)
        .then(res => {
            console.log('resssss',res);
            if(res.data.msg === "Hecho!"){
                var token = encodeURI(res.data.data.token);
                var role = btoa(res.data.data.user.role.name);
                localStorage.setItem('token', token);
                localStorage.setItem('user', role); 
                showToast('success', 'Success', 'LogIn successful.')
                delay(2000).then(() => navigate('/panel/panel'));
            }else{
                showToast('error','Error','Check your credentials.');
            }
        })
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
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label>Correo electrónico</label>
                    <InputText type='email' name='email' onChange={handleChange} required />
                </div>
                <div className='input-container'>
                    <label>Contraseña</label>
                    <Password name='password' onChange={handleChange} required toggleMask />  
                </div>
                <div className='button-container'>
                    <input type='submit' value='Iniciar sesión'/>
                </div>
            </form>
        </div>
    );
    return (
        <div className='app'>
            <Toast ref={myToast}/>
            <div className='login-form'>
                <div className='title'>INICIO DE SESIÓN</div>
                {renderForm}
                <p>¿No tienes cuenta? <NavLink to='/auth/signup'>Regístrate ahora</NavLink></p>
            </div>
        </div>
    );
}