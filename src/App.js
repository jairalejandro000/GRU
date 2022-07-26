import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Home from './pages/home/home';
import Panel from './components/sideBar';
import PageNotFound from './pages/others/pageNotFound';

import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";         

export default function app() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/'>
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<Signup/>}/>
                </Route>
                <Route path='/panel/*' element={<Panel/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
    )
}
