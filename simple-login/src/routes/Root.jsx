import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// pages
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';


function Root() {
    return ( 
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/profile/:id' element={<Profile />} />
            </Routes>
        </Router>
     );
}

export default Root;