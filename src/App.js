import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { history } from './_helpers/history';
import { Alert } from './_components/Alert';

import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import Home from './pages/home/home';
import Panel from './components/sideBar';
import PageNotFound from './pages/others/pageNotFound';

export default function app() {
    return (
        <Router history={history}>
            <Alert />
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/' >
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<Signup/>}/>
                </Route>
                <Route path='/panel/'>
                    <Route path='panel/*' element={<Panel/>}>
                    </Route>
                </Route>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </Router>
    )
}
