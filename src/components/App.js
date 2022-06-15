import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Header from './Header.js';
import {SignIn} from './SignIn.js';

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    );
}