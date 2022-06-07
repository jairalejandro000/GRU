import { NavLink } from 'react-router-dom';

export default function navBar(){
    return(
        <div className="navBar">
            <div className="nombreApp">GRU <div className="nombreNav">Sistema de Desempeño Laboral</div></div>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/auth/login'>Login</NavLink>
                    <NavLink to='/auth/signup'>Signup</NavLink>
                </li>
            </ul>
        </div> 
    )
}