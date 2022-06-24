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
import Repost from './Repost.js';

export default function App() {
    const [visible, setVisible] = useState(true);
    const URL = 'http://localhost:4000';
    // const URL = 'https://projeto17-linkr-grupo2-vini.herokuapp.com';

    return (
        <StateContext.Provider value={{ visible, setVisible, URL }}>
            <BrowserRouter>
                <Header />
                <SearchBar />
                <Routes>
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/" element={<Navigate replace to="sign-in" />} />
                    <Route path="/hashtag/:hashtag" element={<HashtagPosts />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/reposts" element={<Repost />} />
                    <Route path="/user/:id" element={<UserPage />} />
                </Routes>
            </BrowserRouter>
        </StateContext.Provider>
    );
}