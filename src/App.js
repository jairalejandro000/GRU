import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Home from './pages/home/home';
import Panel from './pages/panel/panel';
import PageNotFound from './pages/others/pageNotFound';

import Navbar from './components/navBar';
export default function app() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/' >
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<Signup/>}/>
                </Route>
                <Route path='/panel/' >
                    <Route path='panel' element={<Panel/>}/>
                </Route>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
    )
}
