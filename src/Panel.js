import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { history } from './_helpers/history';
import { Alert } from './_components/Alert';

import Panel from './pages/panel/panel';
import PageNotFound from './pages/others/pageNotFound';

import SideBar from './components/sideBar';

export default function app() {
    return (
        <>
        <SideBar/>
        <Routes>
            <Route path='/' element={<Panel/>}/>
            <Route path='*' element={<Panel/>}/>
        </Routes>
        </>
    )
}
