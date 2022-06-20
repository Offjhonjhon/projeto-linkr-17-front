import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header.js';
import SearchBar from './SearchBar.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import StateContext from '../contexts/StateContext.js';
import Timeline from '../pages/Timeline.js';
import HashtagPosts from '../pages/HashtagPosts.js';
import UserPage from './UserPage.js';

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
                    <Route path="/hashtag/:hashtag" element={<HashtagPosts />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/user/:id" element={<UserPage />} />
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}