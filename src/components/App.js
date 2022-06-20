import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header.js';
import SearchBar from './SearchBar.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import PostDetails from './PostDetails.js';
import StateContext from '../contexts/StateContext.js';
import Timeline from '../pages/Timeline.js';


export default function App() {
    const [visible, setVisible] = useState(true);

    return (
        <StateContext.Provider value={{ visible, setVisible }}>
            <BrowserRouter>
                <Header />
                <SearchBar /> 
                <Routes>

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/" element={<Navigate replace to="sign-in" />} />
                    <Route path="/post-details" element={<PostDetails />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/timeline" element={<Timeline />} /> 

                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}