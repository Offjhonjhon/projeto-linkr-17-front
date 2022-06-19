import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Likes from "./Likes.js";
import Header from './Header.js';
import SearchBar from './SearchBar';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import TimeLine from './TimeLine.js';
import StateContext from '../contexts/StateContext.js';
import Timeline from '../pages/Timeline.js';

export default function App() {
    const [visible, setVisible] = useState(true);

    return (
        <StateContext.Provider value={{ visible, setVisible }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Timeline />} />
                    <Route path="/likes" element={<Likes />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/timeline" element={<TimeLine />} /> 
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}
//<SearchBar />