import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';

import Header from './Header.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import StateContext from '../contexts/StateContext.js';

export default function App() {
    const [visible, setVisible] = useState(true);

    return (
        <StateContext.Provider value={{visible, setVisible}}>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
        </StateContext.Provider>
    );
}